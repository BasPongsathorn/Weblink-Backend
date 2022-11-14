import express, { Response, Request } from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();
router.use(express.json());

router.delete('/deleteallweblinkcate', async( req:Request , res:Response) => {
    const findWeblinkCate = await prisma.weblinkCategories.deleteMany();
    return res.json(findWeblinkCate);
    
})



module.exports = router;