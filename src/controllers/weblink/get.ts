import Joi from 'joi';
import express, { Response, Request } from 'express';
import { PrismaClient } from '@prisma/client';
import AuthMiddlewere from '../../middleware/AuthMiddlewere';
import AdminMiddlewere from '../../middleware/AdminMiddlewere';

const router = express.Router();
const prisma = new PrismaClient();
router.use(express.json());

const getWeblink =  async (req: Request, res: Response) => {
    const page: any = req.query.page;
    const limit: any = req.query.limit;

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const postCount = await prisma.weblink.count();
    const findWebCat = await prisma.weblink.findMany({
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
                ImageFullpath: item.Image ? `${FilePath}/image-weblink/${item.Image}` : null,
            };
            paginations.push(itemObject);
        });
    }

    const result = {
        postCount: postCount,
        paginations: paginations,
    };
    return res.json(result);
}

export { getWeblink }
