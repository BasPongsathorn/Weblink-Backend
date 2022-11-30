import Joi from 'joi';
import express , { Response , Request } from 'express'
import { PrismaClient } from '@prisma/client';
import AuthMiddleware from '../../middleware/AuthMiddlewere';

const router = express.Router();
const prisma = new PrismaClient();
router.use(express.json());


const getDomain = async( req:Request , res:Response) => {
    const page:any = req.query.page
    const limit:any = req.query.limit

    const startIndex = (page - 1)*limit
    const endIndex = page * limit
    
    const postCount = await prisma.domain.count();
    const findWebCat = await prisma.domain.findMany({
        orderBy:{
            CreateAt:"desc"
        }
    })

    const pagina = findWebCat.slice(startIndex , endIndex)
    const result = {postCount , pagina}
    return res.json(result);
    

}



export { getDomain }