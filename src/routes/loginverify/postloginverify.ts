import Joi from 'joi';
import express, { Response, Request } from 'express';
import { Prisma, PrismaClient } from '@prisma/client';
import dayjs from 'dayjs';
import { SendMailOTP } from '../../utils/SendMaill';
import jwt from 'jsonwebtoken';

const router = express.Router();
const prisma = new PrismaClient();
router.use(express.json());

const LOGIN_KEY: any = process.env.LOGIN_KEY;
const LOGIN_EXPIRED_MINUTE: any = process.env.LOGIN_EXPIRED_MINUTE ?? 15;

router.post('/login-verify', async (req: Request, res: Response) => {
    const schema = Joi.object({
        Email: Joi.string().email().required(),
        OTP: Joi.string().length(6).required(),
        LoginType: Joi.string().min(1).max(100).required(),
    });

    const { error } = schema.validate(req.body);

    if (error) {
        return res.status(422).json({
            status: 422,
            message: 'Unprocessable Entity',
            data: error.details,
        });
    }

    const body = req.body;
    const prisma = new PrismaClient();

    return await prisma.$transaction(async function (tx) {
        const verifyOTP: any = await tx.loginEmail.findFirst({
            where: {
                Email: body.Email,
                Otp: body.OTP,
            },
        });

        if (verifyOTP === null || verifyOTP === undefined) {
            return res.status(422).json({
                status: 422,
                message: 'Verify invalid',
            });
        }

        const OtpExpired = verifyOTP.OtpExpired;
        const expiredTime = dayjs(dayjs(OtpExpired).format('YYYY-MM-DDTHH:mm:ss'));
        const dateDiff = expiredTime.diff(dayjs().format('YYYY-MM-DDTHH:mm:ss'), 'minute');

        if (dateDiff < 1) {
            return res.status(422).json({
                status: 422,
                message: 'OTP Expired',
            });
        }

        const AccessToken = jwt.sign(
            {
                Email: body.Email,
            },
            LOGIN_KEY,
            { expiresIn: '1h' },
        );

        if (AccessToken) {
            await tx.token.create({
                data: {
                    Token: AccessToken,
                    LoginType: body.LoginType,
                    Expiretion: new Date(dayjs().add(1, 'hours').format('YYYY-MM-DDTHH:mm:ss')),
                },
            });
            return res.json({
                Email: body.Email,
                AccessToken,
            });
        }

        return res.status(500).json({
            status: 500,
            message: 'Verify Failed',
        });
    });
});

module.exports = router;
