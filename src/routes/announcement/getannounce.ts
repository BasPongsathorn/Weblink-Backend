import express, { Response, Request } from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();
router.use(express.json());

router.get('/getannounce', async( req:Request , res:Response) => {
    const findAnnounce = await prisma.announcement.findMany();
    return res.json(findAnnounce);
    
})



module.exports = router;