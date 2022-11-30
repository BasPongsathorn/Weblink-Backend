import Joi from 'joi';
import express , { Response , Request } from 'express'
import { PrismaClient } from '@prisma/client';
import AuthMiddleware from '../../middleware/AuthMiddlewere';

const router = express.Router();
const prisma = new PrismaClient();
router.use(express.json());

const getFaqUser = async( req:Request , res:Response) => {
    const findFaq = await prisma.faqUser.findMany();
    return res.json(findFaq);
    
}

export { getFaqUser }