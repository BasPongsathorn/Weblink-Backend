import Joi, { any } from "joi";
import express, { Response, Request } from "express";
import { RequestHandler } from "express";
import { PrismaClient } from "@prisma/client";
import AuthMiddleware from "../../middleware/AuthMiddlewere";
import AdminMiddlewere from "../../middleware/AdminMiddlewere";

const router = express.Router();
router.use(express.json());
const prisma = new PrismaClient();

const updateDomain = async( req:Request , res:Response) => {
    const schema = Joi.object({
        ID: Joi.string().uuid().required(),
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

    if (body.DomainName) {
        payload['DomainName'] = body.DomainName;
    }
  


    const update = await prisma.domain.update({
        where: {
            ID: body.ID,
        },
        data: payload,
    });

    return res.json(update);

}

export { updateDomain }
