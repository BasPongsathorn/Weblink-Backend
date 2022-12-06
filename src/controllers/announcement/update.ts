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


const updateAnnounce = async (req: any, res: Response) => {
  const schema = Joi.object({
    AnnouncementID: Joi.string().uuid().required(),
  });

  const options = {
    abortEarly: false,
    allowUnknown: true,
    stripUnknown: true,
  };

  const { error } = schema.validate(req.body, options);



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
  let status = false
  if(body.Public === "1"){
     status = true
  }

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
  if (body.Public) {
    payload['Public'] = status ;
  }
  if (new Date(body.StartDate)) {
    payload['StartDate'] = new Date(body.StartDate) ;
  }
  if (new Date(body.EndDate)) {
    payload['EndDate'] = new Date(body.EndDate) ;
  }
  payload['UpdateBy'] = req.user.Email


  const img: any = req.file?.filename;


  const update = await prisma.announcement.update({
    where: {
      AnnouncementID: body.AnnouncementID,
    },
    data: payload,
    
  });
  
  if (error) {
    unlink(`././src/image/image-Announcement/${oldAnnouncement.Image}`, () => {});
    return res.status(422).json({
      status: 422,
      message: "Unprocessable Entity",
      data: error.details,
    });
  }
  let checkimgdel = req.file?.filename
  if(update != null && oldImage && checkimgdel != null && checkimgdel != "" && checkimgdel != undefined ){
    unlink(`././src/image/image-Announcement/${oldAnnouncement.Image}`, () => {});
  }

  return res.json(update);
};

export { updateAnnounce }