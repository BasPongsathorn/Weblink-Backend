import Joi from 'joi';
import express, { Response, Request } from 'express';
import { PrismaClient } from '@prisma/client';
import dayjs from 'dayjs';
import AuthMiddleware from '../../middleware/AuthMiddlewere';

const router = express.Router();
const prisma = new PrismaClient();
router.use(express.json());

router.get('/getfaquser',AuthMiddleware, async (req: Request, res: Response) => {
    const PopularType: any = req.query.PopularType;
    const limit: any = req.query.limit ?? 10;
    const ArrayType = ['day', 'week', 'month'];

    if (!ArrayType.includes(PopularType)) {
        return res.status(422).json({
            status: 422,
            message: 'Type ไม่ถูกต้อง',
        });
    }

    const findFaq = await prisma.announcement.findMany({
        take: limit,
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
        },
    });
    return res.json(findFaq);
});

module.exports = router;
