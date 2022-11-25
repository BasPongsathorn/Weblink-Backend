import Joi from 'joi';
import express , { Response , Request } from 'express'
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();
router.use(express.json());

router.delete('/deleteloginemailuser', async( req:Request , res:Response) => {
    const schema = Joi.object({
        ID : Joi.string().uuid().required(),
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

  
        const deleteFaqUser = await prisma.loginEmail.delete({
            where: {
                ID : query.ID ,
            },
        });
        return res.json(deleteFaqUser);
   
})


module.exports = router;
