import { getAnnounce , getAnnouncePopular , getAnnounceSingle, getAnnounceMain} from '../controllers/announcement/get';
import { deleteAnnounce } from '../controllers/announcement/delete';
import { updateAnnounce  } from '../controllers/announcement/update';
import { postAnnounce } from '../controllers/announcement/post'


import AuthMiddleware from '../middleware/AuthMiddlewere';
import AdminMiddlewere from '../middleware/AdminMiddlewere';

import multer from 'multer';
import express, { Response, Request } from "express";
import { replaceAll } from '.././utils/helper'



const root = express.Router();

const fileStorageEngine = multer.diskStorage({
    destination: (req: Request, file, cb) => {
      cb(null, "./src/image/image-announcement");
    },
    filename: (req: Request, file, cb) => {
      const originalName = replaceAll(file.originalname, ' ', '-');
      cb(null, Date.now() + "_" + originalName)
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

root.get('/getAnnounce',  AuthMiddleware, getAnnounce );
root.get('/getAnnounce',  AuthMiddleware, getAnnounceMain );
root.get('/getAnnouncePopular',  AuthMiddleware, getAnnouncePopular );
root.get('/getAnnounceSingle',  AuthMiddleware, getAnnounceSingle);
root.delete('/deleteAnnounce', AuthMiddleware , AdminMiddlewere, deleteAnnounce)
root.patch('/updateAnnounce',upload.single('Image'),AuthMiddleware, AdminMiddlewere,updateAnnounce)
root.post('/postAnnounce',upload.single('Image'),AuthMiddleware, AdminMiddlewere,postAnnounce)





export default root;
