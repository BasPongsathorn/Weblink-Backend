import Joi from 'joi';
import express , { Response , Request } from 'express'
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();
router.use(express.json());

router.get('/getweblinkcate', async( req:Request , res:Response) => {
    const findWebCat = await prisma.weblinkCategories.findMany();
    return res.json(findWebCat);
    
})



module.exports = router;
