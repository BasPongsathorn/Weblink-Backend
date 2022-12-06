import Joi from "joi";
import express, { Response, Request, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import multer from "multer";
import { unlink } from 'node:fs';
import AuthMiddleware from "../../middleware/AuthMiddlewere";
import AdminMiddlewere from "../../middleware/AdminMiddlewere";

const router = express.Router();
router.use(express.json());
const prisma = new PrismaClient();


const postAnnounce = async(req: any, res: Response) => {

  
  const schema = Joi.object({
    Title: Joi.string().min(1).max(255).required(),
    Image: Joi.string(),
    Description: Joi.string().min(1).required(),
    CategoryID: Joi.string().min(1).max(255).required(),
  });

  const options = {
    abortEarly: false, // include all errors
    allowUnknown: true, // ignore unknown props
    stripUnknown: true, // remove unknown props
  };

  const { error } = schema.validate(req.body, options);

  if (error) {
    unlink(`././src/image/image-announcement/${req.file?.filename}`, () => {});
    return res.status(422).json({
      status: 422,
      message: "Unprocessable Entity",
      data: error.details,
      
    });
  }

  const body = req.body;
  const img: any = req.file?.filename;


let imagestatus = null
let tagstatus 
let resultimage

  if(body.Tag === "" || body.Tag == undefined ){
    tagstatus = null
  }
  else {
    tagstatus = body.Tag
  }

  if (img === null || img === undefined) {
    resultimage = imagestatus
  }
  else {
    resultimage = img
  }

let status = false
 if(body.Public === "1"){
    status = true
 }


  const payload = {
    Title: body.Title,
    Image: resultimage,
    Description: body.Description,
    Tag: tagstatus,
    CategoryID: body.CategoryID,
    Public: status,
    StartDate: new Date(body.StartDate),
    EndDate: new Date(body.EndDate),
    CreatedBy: req.user.Email
    
    // Role: body.Role,
    // Remove: body.Remove
  };

  const user = await prisma.announcement.create({
    data: payload,
  });
  
  
  return res.status(201).json(user);
  
};


export { postAnnounce }