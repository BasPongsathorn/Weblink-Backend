import express from "express";
import multer from "multer";
import { deleteAllWeblink, deleteWeblink } from "../controllers/weblink/delete";
import { getWeblink } from "../controllers/weblink/get";
import postWeblink from "../controllers/weblink/post";
import updateWeblink from "../controllers/weblink/update";


import AdminMiddlewere from "../middleware/AdminMiddlewere";
import AuthMiddleware from "../middleware/AuthMiddlewere";


const upload = multer({dest: './tmps'});
const root = express.Router();

root.post('/postWeblink', AuthMiddleware, AdminMiddlewere,upload.any(), postWeblink)
root.patch('/updatetWeblink', AuthMiddleware, AdminMiddlewere,upload.any(), updateWeblink)
root.get('/getWeblink', AuthMiddleware, getWeblink)
root.delete('/deleteWeblink', AuthMiddleware , AdminMiddlewere, deleteWeblink)
root.delete('/deleteAllWeblink', AuthMiddleware , AdminMiddlewere, deleteAllWeblink)


export default root;
