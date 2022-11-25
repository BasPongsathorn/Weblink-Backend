import express, { Response, Request } from "express";
import { PrismaClient } from "@prisma/client";
import AuthMiddleware from "../../middleware/AuthMiddlewere";

const router = express.Router();
const prisma = new PrismaClient();
router.use(express.json());

router.delete('/deleteallweblink',AuthMiddleware, async( req:Request , res:Response) => {
    
    const deleteweblink = await prisma.weblink.deleteMany();
    return res.json(deleteweblink);
    
})



module.exports = router;