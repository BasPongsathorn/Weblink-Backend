import express, { Response, Request } from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();
router.use(express.json());

router.delete('/deleteall', async( req:Request , res:Response) => {
    const findAnnounce = await prisma.announcement.deleteMany();
    return res.json(findAnnounce);
    
})



module.exports = router;