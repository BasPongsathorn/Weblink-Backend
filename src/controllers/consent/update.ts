import Joi, { any } from 'joi';
import express, { Response, Request } from 'express';
import e, { RequestHandler } from 'express';
import { PrismaClient } from '@prisma/client';
import AuthMiddleware from '../../middleware/AuthMiddlewere';

const router = express.Router();
router.use(express.json());
const prisma = new PrismaClient();

const updateConsent = async (req: Request, res: Response) => {
    const schema = Joi.object({
        Email: Joi.string().min(1).max(256).required(),
        Consent: Joi.string().min(1).max(256).required(),
    });

    const options = {
        abortEarly: false,
        allowUnknown: true,
        stripUnknown: true,
    };

    const { error } = schema.validate(req.body, options);

    if (error) {
        return res.status(422).json({
            status: 422,
            message: 'Unprocessable Entity',
            data: error.details,
        });
    }

    const body = req.body;
    const prisma = new PrismaClient();
    const payload: any = {};

    if (body.Consent === '1') {
        payload['Consent'] = true;
    } 
    else if (body.Consent === '0') {
        payload['Consent'] = false;
    }
    else return error

    const updateConsent = await prisma.loginEmail.update({
        where: {
            Email: body.Email,
        },
        data: payload,
    });

    return res.json(updateConsent);
};

export { updateConsent }