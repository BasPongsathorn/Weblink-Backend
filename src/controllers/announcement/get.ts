import Joi from 'joi';
import express, { Response, Request, RequestHandler } from 'express';
import { PrismaClient } from '@prisma/client';
import dayjs from 'dayjs';


const router = express.Router();
const prisma = new PrismaClient();
router.use(express.json());

const getAnnounce : RequestHandler = async (req: Request, res: Response) => {
    const page: any = req.query.page;
    const limit: any = req.query.limit;
    const categoryID: any = req.query.categoryID

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    let findWebCat:any

    const postCount = await prisma.announcement.count();
    if(categoryID === "" || categoryID === null || categoryID === undefined)
    {
        findWebCat = await prisma.announcement.findMany({
                orderBy: {
                    CreateAt: 'desc',
                },
            
            });
    }
     else{
        findWebCat = await prisma.announcement.findMany({
            where: {
                CategoryID:categoryID
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

const getAnnounceMain : RequestHandler = async (req: Request, res: Response) => {
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

const getAnnouncePopular : RequestHandler = async (req: Request, res: Response) => {
    const PopularType: any = req.query.PopularType;
    const limit: any = req.query.limit ?? 10;
    const reslimit = parseInt(limit)
    const ArrayType = ['day', 'week', 'month'];

    if (!ArrayType.includes(PopularType)) {
        return res.status(422).json({
            status: 422,
            message: 'Type ไม่ถูกต้อง',
        });
    }

    const findFaq = await prisma.announcement.findMany({
        take: reslimit, 
        orderBy: {
            Viewer: 'desc',
        },
        where: {
            AND: [
                {
                    CreateAt: {
                        gte: new Date(dayjs().startOf(PopularType).format('YYYY-MM-DD')),
                    },
                },
                {
                    CreateAt: {
                        lte: new Date(dayjs().endOf(PopularType).format('YYYY-MM-DD')),
                    },
                },
            ],
            Public: true
         
        },
    });
    return res.json(findFaq);
};

const getAnnounceSingle = async (req: Request, res: Response) => {
    const AnnouncementID = req.body.AnnouncementID;

    const singleAnnounce = await prisma.announcement.findFirst({
        where: {
            AnnouncementID: AnnouncementID,
        },
    });

    if (singleAnnounce !== null && singleAnnounce !== undefined) {
        const findAnotherAnnounce = await prisma.announcement.findMany({
            where: {
                AND: [
                    {
                        CategoryID: singleAnnounce.CategoryID,
                    },
                    {
                        AnnouncementID: {
                            not: singleAnnounce.AnnouncementID,
                        },
                    },
                ],
                Public:true
            },
            orderBy: {
                Viewer: 'asc',
            },
        });
        const result = { singleAnnounce, findAnotherAnnounce };
        return res.json(result);
    } else
        return res.status(422).json({
            status: 422,
            message: 'Type ไม่ถูกต้อง',
        });
};

export { getAnnounce , getAnnouncePopular , getAnnounceSingle , getAnnounceMain}  ;
