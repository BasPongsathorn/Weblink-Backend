import express, { Response, Request } from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();
router.use(express.json());

router.get('/getweblink', async( req:Request , res:Response) => {
    const findWeblink = await prisma.weblink.findMany();
    return res.json(findWeblink);
    
})



module.exports = router;