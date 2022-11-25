import { PrismaClient } from '@prisma/client';
import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';

const LOGIN_KEY: any = process.env.LOGIN_KEY;

const TokenExpired = async (prisma: any, res: Response, token: string) => {
    const findToken = await prisma.token.findFirst({
        where: {
            Token: token,
        },
    });
    if (findToken) {
        await prisma.token.delete({
            where: {
                Token: token,
            },
        });
        return res.status(401).json({
            status: 401,
            message: 'TokenExpired',
        });
    }
    return res.sendStatus(401);
};

const AuthMiddleware = (req: any, res: Response, next: NextFunction) => {
    const bearerHeader: any = req.headers.authorization;

    if (bearerHeader === null || bearerHeader === undefined) {
        return res.status(401).json({
            status: 401,
            message: 'AccessToken not found',
        });
    }

    if (typeof bearerHeader !== 'undefined' || typeof bearerHeader !== undefined) {
        const bearer: any = bearerHeader.split(' ');
        const bearerToken: any = bearer[1];
        req.token = bearerToken;

        jwt.verify(bearerToken, LOGIN_KEY, async (err: any, AuthData: any) => {
            const prisma = new PrismaClient();
            return await prisma.$transaction(async function (tx) {
                if (err) {
                    if (err.name === 'TokenExpiredError') {
                        return await TokenExpired(tx, res, bearerToken);
                    } else {
                        return res.status(401).json(err);
                    }
                } else {
                    const tokenData: any = await tx.token.findFirst({
                        where: {
                            Token: bearerToken,
                        },
                    });

                    if (tokenData) {
                        const user = await tx.loginEmail.findFirst({
                            where: {
                                Email: AuthData.Email,
                            },
                            select: {
                                ID: true,
                                Email: true,
                                DomainID: true,
                                Role: true,
                                Remove: true,
                                Consent: true,
                                CreatedBy: true,
                                UpdatedBy: true,
                                CreateAt: true,
                                UpdateAt: true,
                                Domains: true,
                            },
                        });
                        if (user) {
                            req.user = user;
                            next();
                            return;
                        }
                    }
                    return res.status(401).json({
                        status: 401,
                        message: 'TokenInValid',
                    });
                }
            });
        });
    } else {
        return res.sendStatus(403);
    }
};

export default AuthMiddleware;
