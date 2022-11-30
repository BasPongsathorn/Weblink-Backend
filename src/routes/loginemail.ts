import express from "express";
import { deleteLoginEmail } from "../controllers/loginemail/delete";
import { getLoginEmail } from "../controllers/loginemail/get";
import { postLoginEmail } from "../controllers/loginemail/post";

import AdminMiddlewere from "../middleware/AdminMiddlewere";
import AuthMiddleware from "../middleware/AuthMiddlewere";



const root = express.Router();

root.get('/getLoginEmail', AuthMiddleware, AdminMiddlewere, getLoginEmail)
root.post('/postLoginEmail', postLoginEmail)
root.delete('/deleteLoginEmail', AuthMiddleware, AdminMiddlewere, deleteLoginEmail)

export default root;
