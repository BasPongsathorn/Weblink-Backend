import Joi, { any } from "joi";
import express, { Response, Request } from "express";
import { RequestHandler } from "express";
import { PrismaClient } from "@prisma/client";
import { unlink } from 'node:fs';
import multer from "multer";
import AuthMiddleware from "../../middleware/AuthMiddlewere";
import AdminMiddlewere from "../../middleware/AdminMiddlewere";


const router = express.Router();
router.use(express.json());
const prisma = new PrismaClient();


const updateAnnounce = async (req: Request, res: Response) => {
  const schema = Joi.object({
    AnnouncementID: Joi.string().uuid().required(),
  });

  const options = {
    abortEarly: false,
    allowUnknown: true,
    stripUnknown: true,
  };

  const { error } = schema.validate(req.body, options);

  if (error) {
    unlink(`../../image/image-announcement/${req.file?.filename}`, () => {});
    return res.status(422).json({
      status: 422,
      message: "Unprocessable Entity",
      data: error.details,
    });
  }

  const body = req.body;
  const prisma = new PrismaClient();
  const oldAnnouncement = await prisma.announcement.findUnique({
    where: {
      AnnouncementID: body.AnnouncementID,
    },
  });
  if (oldAnnouncement === undefined || oldAnnouncement === null){
     return res.status(422).json({
      status: 422,
      message: "Announce not found",
    });
  }

  const oldImage = oldAnnouncement.Image
  const payload: any = {};


  if (body.Title) {
      payload['Title'] = body.Title ;
  }
  if (req.file?.filename) {
    payload['Image'] = req.file?.filename ;
  }
  if (body.CategoryID) {
    payload['CategoryID'] = body.CategoryID ;
  }
  if (body.Description) {
    payload['Description'] = body.Description ;
  }
  if (body.Tag) {
    payload['Tag'] = body.Tag ;
  }

  const img: any = req.file?.filename;

 

  const update = await prisma.announcement.update({
    where: {
      AnnouncementID: body.AnnouncementID,
    },
    data: payload,
    
  });
  
  // console.log(oldImage)

  if(update != null && oldImage){
    unlink(`././src/image/image-Announcement/${oldAnnouncement.Image}`, () => {});
  }

  return res.json(update);
};

export { updateAnnounce }