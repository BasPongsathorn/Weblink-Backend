import Joi from "joi";
import express, { Response, Request, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import multer from "multer";
import { unlink } from 'node:fs';

const router = express.Router();
router.use(express.json());
const prisma = new PrismaClient();


const fileStorageEngine = multer.diskStorage({
  destination: (req: Request, file, cb) => {
    cb(null, "./src/image/image-announcement");
  },
  filename: (req: Request, file, cb) => {
    cb(null, Date.now() + "__" + file.originalname);
  },
});

const upload = multer({
  storage: fileStorageEngine,
  fileFilter: (req: Request, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg" ||
      file.mimetype == "image/webp"
      
    ) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  },
});

router.post("/addannounce" ,upload.single('Image'),async(req: Request, res: Response) => {

  
  const schema = Joi.object({
    Title: Joi.string().min(1).max(255).required(),
    Image: Joi.string(),
    Description: Joi.string().min(1).max(255).required(),
    Tag: Joi.string().min(1).max(255),
    Category: Joi.string().min(1).max(255).required(),
  });

  const options = {
    abortEarly: false, // include all errors
    allowUnknown: true, // ignore unknown props
    stripUnknown: true, // remove unknown props
  };

  const { error } = schema.validate(req.body, options);

  if (error) {
    unlink(`./src/image/image-announcement/${req.file?.filename}`, () => {
      
    });
    return res.status(422).json({
      status: 422,
      message: "Unprocessable Entity",
      data: error.details,
      
    });
  }

  const body = req.body;
  const img: any = req.file?.filename;

  

  if (img === null || img === undefined) {
    return res.status(422).json({
      status: 422,
      message: "Image not found",
    });
  }

  

  const payload = {
    Title: body.Title,
    Image: img,
    Description: body.Description,
    Tag: body.Tag,
    Category: body.Category,
    // Role: body.Role,
    // Remove: body.Remove
  };


  const user = await prisma.announcement.create({
    data: payload,
  });

  
  return res.status(201).json(user);
  
});


module.exports = router;
