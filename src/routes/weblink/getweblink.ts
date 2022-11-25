import Joi from 'joi';
import express , { Response , Request } from 'express'
import { PrismaClient } from '@prisma/client';
import AuthMiddlewere from '../../middleware/AuthMiddlewere';
import AdminMiddlewere from '../../middleware/AdminMiddlewere';

const router = express.Router();
const prisma = new PrismaClient();
router.use(express.json());


router.get('/getweblink', AuthMiddlewere, async( req:Request , res:Response) => {
    const page:any = req.query.page
    const limit:any = req.query.limit

    const startIndex = (page - 1)*limit
    const endIndex = page * limit
    
    const postCount = await prisma.weblink.count();
    const findWebCat = await prisma.weblink.findMany({
        orderBy:{
            CreateAt:"desc"
        }
    })
    
    const pagina = findWebCat.slice(startIndex , endIndex)
    const result = {postCount , pagina}
    return res.json(result);
    

})



module.exports = router;
