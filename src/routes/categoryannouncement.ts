import { getCaategoryAnnounce } from '../controllers/categoryannouncement/get';
import { deleteCategoryAnnounce } from '../controllers/categoryannouncement/delete';
import { updateCategoryAnnounce } from '../controllers/categoryannouncement/update';
import { postCategoryAnnounce } from '../controllers/categoryannouncement/post';


import AuthMiddleware from '../middleware/AuthMiddlewere';
import AdminMiddlewere from '../middleware/AdminMiddlewere';

import express from "express";



const root = express.Router();

root.get('/getCategoryAnnounce',  AuthMiddleware, getCaategoryAnnounce );
root.delete('/deleteCategoryAnnounce', AuthMiddleware , AdminMiddlewere, deleteCategoryAnnounce)
root.patch('/updateCategoryAnnounce',AuthMiddleware, AdminMiddlewere, updateCategoryAnnounce)
root.post('/postCategoryAnnounce',AuthMiddleware, AdminMiddlewere, postCategoryAnnounce)





export default root;
