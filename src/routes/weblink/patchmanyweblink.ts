import multer from "multer";
import express from "express";
import updateUpload from "../../../updateManyWeblink/updateWeblink";
import AuthMiddleware from "../../middleware/AuthMiddlewere";
import AdminMiddlewere from "../../middleware/AdminMiddlewere";

const router = express.Router();

const upload = multer({dest: './tmps'});
router.patch('/patchmanyweblink',upload.any(),AuthMiddleware, AdminMiddlewere, updateUpload);

module.exports = router;
