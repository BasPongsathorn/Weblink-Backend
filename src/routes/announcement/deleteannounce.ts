import Joi from 'joi';
import express, { Response, Request } from 'express';
import { PrismaClient } from '@prisma/client';
import { unlink } from 'node:fs';
import AuthMiddleware from '../../middleware/AuthMiddlewere';
import AdminMiddlewere from '../../middleware/AdminMiddlewere';

const router = express.Router();
const prisma = new PrismaClient();
router.use(express.json());

router.delete('/deleteannounce',AuthMiddleware,AdminMiddlewere, async (req: Request, res: Response) => {
    const schema = Joi.object({
        AnnouncementID: Joi.string().uuid().required(),
    });
    const options = {
        abortEarly: false,
        allowUnknown: true,
        stripUnknown: true,
    };

    const { error } = schema.validate(req.query, options);

    if (error) {
        return res.status(422).json({
            status: 422,
            message: 'Unprocessable Entity',
            data: error.details,
        });
    }

    const body = req.body;
    const query: any = req.query;
    const prisma = new PrismaClient();

    const oldAnnouncement = await prisma.announcement.findUnique({
        where: {
            AnnouncementID: query.AnnouncementID,
        },
    });

    if (oldAnnouncement === undefined || oldAnnouncement === null) {
        return res.status(422).json({
            status: 422,
            message: 'Announce not found',
        });
    }

    if (oldAnnouncement.Image != null) {
        unlink(`././src/image/image-announcement/${oldAnnouncement.Image}`, () => {});
    }

    const deleteWebCat = await prisma.announcement.delete({
        where: {
            AnnouncementID: query.AnnouncementID,
        },
    });

    return res.json(deleteWebCat);
});

module.exports = router;
