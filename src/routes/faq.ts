import express from "express";
import { deleteFaq } from "../controllers/faq/delete";
import { getFaq } from "../controllers/faq/get";
import { updateFaq } from "../controllers/faq/update";
import { postFaq } from "../controllers/faq/post"

import AdminMiddlewere from "../middleware/AdminMiddlewere";
import AuthMiddleware from "../middleware/AuthMiddlewere";



const root = express.Router();

root.get('/getFaq', AuthMiddleware, AdminMiddlewere, getFaq)
root.post('/postFaq', AuthMiddleware, AdminMiddlewere, postFaq )
root.delete('/deleteFaq', AuthMiddleware, AdminMiddlewere, deleteFaq)
root.patch('/updateFaq', AuthMiddleware , AdminMiddlewere, updateFaq)


export default root;
