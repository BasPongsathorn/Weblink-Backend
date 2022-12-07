import Joi, { number } from 'joi';
import express, { Response, Request, RequestHandler } from 'express';
import { PrismaClient } from '@prisma/client';
import dayjs from 'dayjs';

const router = express.Router();
const prisma = new PrismaClient();
router.use(express.json());

const getAnnounce: RequestHandler = async (req: Request, res: Response) => {
    const page: any = req.query.page;
    const limit: any = req.query.limit;
    const categoryID: any = req.query.categoryID;

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    let findWebCat: any;

    const postCount = await prisma.announcement.count();
    if (categoryID === '' || categoryID === null || categoryID === undefined) {
        findWebCat = await prisma.announcement.findMany({
            orderBy: {
                CreateAt: 'desc',
            },
        });
    } else {
        findWebCat = await prisma.announcement.findMany({
            where: {
                CategoryID: categoryID,
            },
            orderBy: {
                CreateAt: 'desc',
            },
        });
    }

    const pagina = findWebCat.slice(startIndex, endIndex);
    const FilePath = process.env.FilePath;

    const paginations: any = [];
    if (pagina && pagina.length > 0) {
        pagina.map((item: any) => {
            const itemObject: any = {
                ...item,
                ImageFullpath: item.Image ? `${FilePath}/image-announcement/${item.Image}` : null,
            };
            paginations.push(itemObject);
        });
    }

    const result = {
        postCount: postCount,
        paginations: paginations,
    };
    return res.json(result);
};

const getAnnounceMain: RequestHandler = async (req: Request, res: Response) => {
    const page: any = req.query.page;
    const limit: any = req.query.limit;

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const postCount = await prisma.announcement.count();
    const findWebCat = await prisma.announcement.findMany({
        orderBy: {
            CreateAt: 'desc',
        },
    });

    const pagina = findWebCat.slice(startIndex, endIndex);
    const FilePath = process.env.FilePath;

    const paginations: any = [];
    if (pagina && pagina.length > 0) {
        pagina.map((item: any) => {
            const itemObject: any = {
                ...item,
                ImageFullpath: item.Image ? `${FilePath}/image-announcement/${item.Image}` : null,
            };
            paginations.push(itemObject);
        });
    }

    const result = {
        postCount: postCount,
        paginations: paginations,
    };
    return res.json(result);
};

const getAnnouncePopular: RequestHandler = async (req: Request, res: Response) => {
    const PopularType: any = req.query.PopularType;
    const limit: any = req.query.limit ?? 10;
    const reslimit = parseInt(limit);
    const ArrayType = ['day', 'week', 'month'];

    if (!ArrayType.includes(PopularType)) {
        return res.status(422).json({
            status: 422,
            message: 'Type ไม่ถูกต้อง',
        });
    }

    const findAnnouncePop = await prisma.announcement.findMany({
        take: reslimit,
        orderBy: {
            Viewer: 'desc',
        },
        where: {
            AND: [
                {
                    CreateAt: {
                        gte: new Date(dayjs().startOf(PopularType).format('YYYY-MM-DD HH:mm:ss')),
                    },
                },
                {
                    CreateAt: {
                        lte: new Date(dayjs().endOf(PopularType).format('YYYY-MM-DD HH:mm:ss')),
                    },
                },
            ],
            Public: true,
        },
    });

    const FilePath = process.env.FilePath;
    const announcePopular: any = [];
    if (findAnnouncePop && findAnnouncePop.length > 0) {
        findAnnouncePop.map((item: any) => {
            const itemObject: any = {
                ...item,
                ImageFullpath: item.Image ? `${FilePath}/image-announcement/${item.Image}` : null,
            };
            announcePopular.push(itemObject);
        });
    }

    return res.json(announcePopular);
};

const getAnnounceSingle = async (req: Request, res: Response) => {
    const schema = Joi.object({
        AnnouncementID: Joi.string().uuid().required(),
    });

    const options = {
        abortEarly: false, // include all errors
        allowUnknown: true, // ignore unknown props
        stripUnknown: true, // remove unknown props
    };

    const { error } = schema.validate(req.query, options);

    if (error) {
        return res.status(422).json({
            status: 422,
            message: 'Unprocessable Entity',
            data: error.details,
        });
    }

    const query: any = req.query;
    const AnnouncementID = query.AnnouncementID;

    const findSingleAnnounce = await prisma.announcement.findFirst({
        where: {
            AnnouncementID: AnnouncementID,
        },
    });

    if (findSingleAnnounce !== null && findSingleAnnounce !== undefined) {
        const FilePath = process.env.FilePath;
        const singleAnnounce: any = {
            ...findSingleAnnounce,
            ImageFullpath: findSingleAnnounce.Image
                ? `${FilePath}/image-announcement/${findSingleAnnounce.Image}`
                : null,
        };

        const count = query.limit ? parseInt(query.limit) : 5;
        const itemCount = await prisma.announcement.count();
        const skip = Math.max(0, Math.floor(Math.random() * itemCount) - count);

        const findAnotherAnnounce = await prisma.announcement.findMany({
            where: {
                AND: [
                    {
                        CategoryID: findSingleAnnounce.CategoryID,
                    },
                    {
                        AnnouncementID: {
                            not: findSingleAnnounce.AnnouncementID,
                        },
                    },
                ],
                Public: true,
            },
            take: count,
            skip: skip,
        });

        const anotherAnnounce: any = [];
        if (findAnotherAnnounce && findAnotherAnnounce.length > 0) {
            findAnotherAnnounce.map((item: any) => {
                const itemObject: any = {
                    ...item,
                    ImageFullpath: item.Image ? `${FilePath}/image-announcement/${item.Image}` : null,
                };
                anotherAnnounce.push(itemObject);
            });
        }
        const result = { singleAnnounce, anotherAnnounce };
        return res.json(result);
    } else
        return res.status(422).json({
            status: 422,
            message: 'Type ไม่ถูกต้อง',
        });
};

export { getAnnounce, getAnnouncePopular, getAnnounceSingle, getAnnounceMain };
