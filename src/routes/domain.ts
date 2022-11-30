import express from "express";
import { deleteDomain } from "../controllers/domain/delete";
import { getDomain } from "../controllers/domain/get";
import { postDomanin } from "../controllers/domain/post";
import { updateDomain } from "../controllers/domain/update";
import AdminMiddlewere from "../middleware/AdminMiddlewere";
import AuthMiddleware from "../middleware/AuthMiddlewere";



const root = express.Router();

root.patch('/updateDomain', AuthMiddleware, AdminMiddlewere ,updateDomain)
root.get('/getDomain', getDomain)
root.post('/postDomain',postDomanin)
root.delete('/deleteDomain', AuthMiddleware, AdminMiddlewere , deleteDomain)



export default root;
