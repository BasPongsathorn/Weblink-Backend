import express from "express";
import { updateConsent } from "../controllers/consent/update";



const root = express.Router();

root.patch('/updateConsent',updateConsent)



export default root;
