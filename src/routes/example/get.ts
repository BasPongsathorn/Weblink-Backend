import Joi from "joi";
import express, { Response, Request } from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();
router.use(express.json());

router.get("/findtest", async (req: Request, res: Response) => {
  // const finduser = await prisma.test.findMany();
  // return res.json(finduser);

    //   let user: any = null;
    //   const wb = [{CategoryName:"P2P"},{CategoryName:"O2C"},{CategoryName:"MDMs"}]
    //   const payload: any =[];
    //   if (wb && wb.length > 0) {
    //   wb.map((item: any) => {
    //       payload.push({
    //           CategoryName: item.CategoryName
    //       });
    //   });
      
    // }
    // user = await prisma.weblinkCategories.createMany({
    //   data: payload,
    // });
    // return res.status(201).json(user);

});

module.exports = router;
