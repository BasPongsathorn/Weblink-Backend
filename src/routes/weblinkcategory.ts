import express from "express";
import { deleteAllWeblinkcategory, deleteWeblinkCategory } from "../controllers/weblinkcategory/delete";
import { getWeblinkCategory } from "../controllers/weblinkcategory/get";
import { postWeblinkCategory } from "../controllers/weblinkcategory/post";
import { updateWeblinkCategory } from "../controllers/weblinkcategory/update";


import AdminMiddlewere from "../middleware/AdminMiddlewere";
import AuthMiddleware from "../middleware/AuthMiddlewere";



const root = express.Router();

root.post('/postWeblinkCategory', AuthMiddleware, AdminMiddlewere, postWeblinkCategory)
root.get('/getWeblinkCategory', AuthMiddleware, getWeblinkCategory)
root.patch('/patchWeblinkCategory', AuthMiddleware, AdminMiddlewere, updateWeblinkCategory)
root.delete('/deleteWeblinkCategory', AuthMiddleware, AdminMiddlewere, deleteWeblinkCategory)
root.delete('/deleteAllWeblinkCategory', AuthMiddleware, AdminMiddlewere, deleteAllWeblinkcategory)

export default root;
