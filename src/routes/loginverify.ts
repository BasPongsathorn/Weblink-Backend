import express from "express";
import { postLoginVerify } from "../controllers/loginverify/post";



const root = express.Router();

root.post('/postLoginVerify', postLoginVerify)

export default root;
