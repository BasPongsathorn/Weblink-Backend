import Joi from 'joi';
import express, { Response, Request } from 'express';
import { Prisma, PrismaClient } from '@prisma/client';
import dayjs from 'dayjs';
import { SendMailOTP } from '../../utils/SendMaill';

const router = express.Router();
const prisma = new PrismaClient();
router.use(express.json());

const LOGIN_EXPIRED_MINUTE: any = process.env.LOGIN_EXPIRED_MINUTE ?? 15;

const postLoginEmail =  async (req: Request, res: Response) => {
    const schema = Joi.object({
        Email: Joi.string().min(1).max(255).required(),
        DomainName: Joi.string().required(),
        LoginType: Joi.string().min(1).max(255).required(),
    });

    const { error } = schema.validate(req.body);

    if (error) {
        return res.status(422).json({
            status: 422,
            message: 'Unprocessable Entity',
            data: error.details,
        });
    }

    const ReqEmail = req.body.Email;
    const DomainName = req.body.DomainName;
    const LoginType = req.body.LoginType;
    const prisma = new PrismaClient();

    return await prisma.$transaction(async function (tx) {
        if (LoginType === 'Email') {
            const domain = await tx.domain.findFirst({
                where: {
                    DomainName: DomainName,
                },
            });

            if (domain === null || domain === undefined) {
                return res.status(422).json({
                    status: 422,
                    message: 'Domain not allowed',
                });
            }

            let email: any = await tx.loginEmail.findFirst({
                where: {
                    Email: ReqEmail,
                },
            });

            if (email === null || email === undefined) {
                email = await tx.loginEmail.create({
                    data: {
                        Email: ReqEmail,
                        DomainID: domain.ID,
                    },
                });
            }

            const otp = Math.floor(100000 + Math.random() * 900000);
            const OtpExpired = dayjs().add(LOGIN_EXPIRED_MINUTE, 'minute').format();
            const updateUser = await tx.loginEmail.update({
                where: {
                    Email: ReqEmail,
                },
                data: {
                    Email: ReqEmail,
                    Otp: otp.toString(),
                    OtpExpired: OtpExpired,
                },
            });
            //  if (updateUser) {
            //      await SendMailOTP(otp, ReqEmail);
            //      return res.json({
            //          message: 'OK',
            //     });
                  console.log(otp)
            //  }
            return res.status(500).json({
                message: 'Failed',
            });
        } else {
            // ...
        }
    });
}

export { postLoginEmail }
// import Joi from "joi";
// import express, { Response, Request, NextFunction } from "express";
// import { PrismaClient } from "@prisma/client";

// const router = express.Router();
// router.use(express.json());
// const prisma = new PrismaClient();

// router.post("/addfaquser" ,async(req: Request, res: Response) => {

//   const schema = Joi.object({
//     Email: Joi.string().min(1).max(255).required(),
//   });

//   const options = {
//     abortEarly: false, // include all errors
//     allowUnknown: true, // ignore unknown props
//     stripUnknown: true, // remove unknown props
//   };

//   const { error } = schema.validate(req.body, options);

//   if (error) {
//     return res.status(422).json({
//       status: 422,
//       message: "Unprocessable Entity",
//       data: error.details,

//     });
//   }

//   const body = req.body;

//   const payload = {
//     Email: body.Email
//     // Role: body.Role,
//     // Remove: body.Remove
//   };

//   const createfaq = await prisma.loginEmail.create({
//     data: payload,
//   });

//   return res.status(201).json(createfaq);

// });

// module.exports = router;
