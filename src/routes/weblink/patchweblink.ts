import Joi, { any } from "joi";
import express, { Response, Request } from "express";
import { RequestHandler } from "express";
import { PrismaClient } from "@prisma/client";
import { unlink } from 'node:fs';
import multer from "multer";


const router = express.Router();
router.use(express.json());
const prisma = new PrismaClient();

const fileStorageEngine = multer.diskStorage({
  destination: (req: Request, file, cb) => {
    cb(null, "./src/image/image-weblink");
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

router.patch("/updateweblink",upload.single('Image'), async (req: Request, res: Response) => {
  const schema = Joi.object({
    WeblinkID: Joi.string().uuid().required(),
  });

  const options = {
    abortEarly: false,
    allowUnknown: true,
    stripUnknown: true,
  };

  const { error } = schema.validate(req.body, options);

  if (error) {
    unlink(`./src/image/image-weblink/${req.file?.filename}`, () => {});
    return res.status(422).json({
      status: 422,
      message: "Unprocessable Entity",
      data: error.details,
    });
  }

  const body = req.body;
  const prisma = new PrismaClient();
  const oldweblink = await prisma.weblink.findUnique({
    where: {
      WeblinkID: body.WeblinkID,
    },
  });
  if (oldweblink === undefined || oldweblink === null){
     return res.status(422).json({
      status: 422,
      message: "Weblimk not found",
    });
  }

  const oldImage = oldweblink.Image
  console.log(oldImage)
  const payload: any = {};

  if (body.Title) {
      payload['Title'] = body.Title ;
  }
  if (req.file?.filename) {
    payload['Image'] = req.file?.filename ;
  }
  if (body.URL) {
    payload['URL'] = body.URL ;
  }
  if (body.WeblinkCategoryID) {
    payload['WeblinkCategoryID'] = body.WeblinkCategoryID ;
  }
 

  const img: any = req.file?.filename;

  if (img === null || img === undefined) {
    return res.status(422).json({
      status: 422,
      message: "Image not found",
    });
  }

  const update = await prisma.weblink.update({
    where: {
      WeblinkID: body.WeblinkID,
    },
    data: payload,
    
  });
  
  // console.log(oldImage)

  if(update != null && oldImage){
      unlink(`./src/image/image-weblink/${oldImage}`, () => {});
  }

  return res.json(update);
});

module.exports = router;
