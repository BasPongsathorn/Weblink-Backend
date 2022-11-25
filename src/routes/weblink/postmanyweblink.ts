import multer from "multer";
import express from "express";
import postUpload from "../../../postManyWeblink/postWeblink";
import AuthMiddleware from "../../middleware/AuthMiddlewere";
import AdminMiddlewere from "../../middleware/AdminMiddlewere";

const router = express.Router();

const upload = multer({dest: './tmps'});
router.post('/postmanyweblink',upload.any(),AuthMiddleware, AdminMiddlewere, postUpload);

module.exports = router;
