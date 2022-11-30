import Joi from "joi";
import express, { Response, Request } from "express";
import { PrismaClient } from "@prisma/client";
import { unlink } from 'node:fs';



const router = express.Router();
const prisma = new PrismaClient();
router.use(express.json());

const deleteWeblink = async (req: Request, res: Response) => {
  const schema = Joi.object({
    WeblinkID: Joi.string().uuid().required(),
  });
  const options = {
    abortEarly: false,
    allowUnknown: true,
    stripUnknown: true,
  };

  const { error } = schema.validate(req.query, options);

  if (error) {
    return res.status(422).json({
      status: 422,
      message: "Unprocessable Entity",
      data: error.details,
    });
  }

  const body = req.body;
  const query: any = req.query;
  const prisma = new PrismaClient();
  
  const oldWeblink = await prisma.weblink.findUnique({
    where: {
       WeblinkID: query. WeblinkID,
    },
  });
 



    if (oldWeblink === undefined || oldWeblink === null){
       return res.status(422).json({
        status: 422,
        message: "Weblik not found",
      });
    }
   
    if(oldWeblink.Image != null){
        unlink(`././src/image/image-weblink/${oldWeblink.Image}`, () => {});
    }
  

    const deleteWeblink = await prisma.weblink.delete({
      where: {
         WeblinkID: query. WeblinkID,
      },
    });

    return res.json(deleteWeblink);
};


const deleteAllWeblink = async( req:Request , res:Response) => {
    
  const deleteweblink = await prisma.weblink.deleteMany();
  return res.json(deleteweblink);
  
}


export { deleteAllWeblink , deleteWeblink }