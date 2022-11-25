import Joi from 'joi';
import express, { Response, Request } from 'express';
import { PrismaClient } from '@prisma/client';
import dayjs from 'dayjs';

const router = express.Router();
const prisma = new PrismaClient();
router.use(express.json());

router.get('/getloginemailuser', async (req: Request, res: Response) => {
    
    const findUserAcc = await prisma.loginEmail.findMany();
    return res.json(findUserAcc);
});

module.exports = router;
