import Joi from 'joi';
import express , { Response , Request } from 'express'
import { PrismaClient } from '@prisma/client';
import AuthMiddleware from '../../middleware/AuthMiddlewere';
import AdminMiddlewere from '../../middleware/AdminMiddlewere';

const router = express.Router();
const prisma = new PrismaClient();
router.use(express.json());

router.delete('/deleteweblinkcate',AuthMiddleware, AdminMiddlewere, async( req:Request , res:Response) => {
    const schema = Joi.object({
        WeblinkCategoryID : Joi.string().uuid().required(),
    });

    const options = {
        abortEarly: false,
        allowUnknown: true,
        stripUnknown: true,
    };

    const { error } = schema.validate(req.query, options);

    if (error) {
        return res.status(422).json({
            status: 422,
            message: 'Unprocessable Entity',
            data: error.details,
        });
    }

    const query: any = req.query;

  
        const deleteWebCat = await prisma.weblinkCategories.delete({
            where: {
                WeblinkCategoryID : query.WeblinkCategoryID ,
            },
        });
        return res.json(deleteWebCat);
   
})


module.exports = router;
