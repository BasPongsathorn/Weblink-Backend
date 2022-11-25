import Joi, { any } from "joi";
import express, { Response, Request } from "express";
import { RequestHandler } from "express";
import { PrismaClient } from "@prisma/client";
import bodyParser from "body-parser";

const router = express.Router();
router.use(express.json());
const prisma = new PrismaClient();


router.post("/addtest", async (req: Request, res: Response) => {

  const body = req.body
  const wb = req.body.wb
  return console.log(wb)
  const payload = []
  


  
  


  
  
})

module.exports = router;
