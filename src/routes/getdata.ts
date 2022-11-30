import express from "express";
import { getViewer } from "../controllers/getdata/get";

import AdminMiddlewere from "../middleware/AdminMiddlewere";
import AuthMiddleware from "../middleware/AuthMiddlewere";



const root = express.Router();

root.get('/getViewer', AuthMiddleware, getViewer)

export default root;
