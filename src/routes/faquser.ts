import express from "express";
import { deleteFaqUser } from "../controllers/faquser/delete";
import { getFaqUser } from "../controllers/faquser/get";
import { postFaqUser } from "../controllers/faquser/post";
import AdminMiddlewere from "../middleware/AdminMiddlewere";
import AuthMiddleware from "../middleware/AuthMiddlewere";



const root = express.Router();

root.get('/getFaqUser', AuthMiddleware, AdminMiddlewere, getFaqUser)
root.post('/postFaqUser', AuthMiddleware, AdminMiddlewere, postFaqUser)
root.delete('/deleteFaqUser', AuthMiddleware, AdminMiddlewere, deleteFaqUser)


export default root;
