import Joi from 'joi';
import express , { Response , Request } from 'express'
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();
router.use(express.json());


router.get('/getannouncepagination', async( req:Request , res:Response) => {
    const page:any = req.query.page
    const limit:any = req.query.limit

    const startIndex = (page - 1)*limit
    const endIndex = page * limit
    
    const findWebCat = await prisma.announcement.findMany({
        skip:startIndex,
        take:endIndex,
        // orderBy:{ 
            
        //     CategoryName:'asc'
        // }
    });
    // const result = findWebCat.slice(startIndex , endIndex)
    return res.json(findWebCat);
    

})



module.exports = router;
