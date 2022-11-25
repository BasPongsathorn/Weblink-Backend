import express, { Response, Request } from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();
router.use(express.json());

router.delete('/deleteallwebcate', async( req:Request , res:Response) => {
    const deleteallwebcate = await prisma.weblinkCategories.deleteMany();
    return res.json(deleteallwebcate);
    
})



module.exports = router;