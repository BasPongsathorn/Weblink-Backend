import Joi from 'joi';
import express, { Response, Request } from 'express';
import { PrismaClient } from '@prisma/client';
import dayjs from 'dayjs';
import AuthMiddleware from '../../middleware/AuthMiddlewere';

const router = express.Router();
const prisma = new PrismaClient();
router.use(express.json());

const LIMIT_VIEW_COUNT: any = process.env.LIMIT_VIEW_COUNT ?? 30;

const getViewer = async (req: any, res: Response) => {
    const schema = Joi.object({
        AnnouncementID: Joi.string().uuid().required(),
    });

    const { error } = schema.validate(req.body);

    if (error) {
        return res.status(422).json({
            status: 422,
            message: 'Unprocessable Entity',
            data: error.details,
        });
    }

    const body = req.body;
    const Email = req.user.Email;
    const AnnouncementID = body.AnnouncementID;
    const announcement = await prisma.announcement.findUnique({
        where: {
            AnnouncementID: AnnouncementID,
        },
    });

    if (announcement === null || announcement === undefined) {
        return res.status(422).json({
            status: 422,
            message: 'Announcement not found',
        });
    }

    return await prisma.$transaction(async function (tx) {
        const findViewer = await tx.viewer.findFirst({
            where: {
                AnnouncementID: AnnouncementID,
                Email: Email,
            },
            orderBy: {
                CreateAt: 'desc',
            },
        });

        let createViewer: any = null;

        if (findViewer) {
            const Expired = findViewer.CreateAt;
            const expiredTime = dayjs(dayjs().format('YYYY-MM-DDTHH:mm:ss'));
            const dateDiff = expiredTime.diff(
                dayjs(dayjs(Expired).format('YYYY-MM-DDTHH:mm:ss')).format('YYYY-MM-DDTHH:mm:ss'),
                'minute',
            );
            if (dateDiff > LIMIT_VIEW_COUNT) {
                createViewer = await tx.viewer.create({
                    data: {
                        AnnouncementID: AnnouncementID,
                        Email: Email,
                    },
                });
            }
        } else {
            createViewer = await tx.viewer.create({
                data: {
                    AnnouncementID: AnnouncementID,
                    Email: Email,
                },
            });
        }

        if (createViewer) {
            const viewCount = announcement.Viewer + 1;
            await tx.announcement.update({
                where: {
                    AnnouncementID: AnnouncementID,
                },
                data: {
                    Viewer: viewCount,
                },
            });
            return res.json({
                message: viewCount,
            });
        }

        return res.status(200).json({
            status: 200,
            message: 'not time yet',
        });
    });
}

export { getViewer }
