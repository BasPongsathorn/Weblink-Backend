import Joi from 'joi';
import express , { Response , Request } from 'express'
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();
router.use(express.json());

// router.get('/find', async( req:Request , res:Response) => {
//     const finduser = await prisma.user.findMany();
//     return res.json(finduser);
    
// })



module.exports = router;
