import { RequestHandler, response } from 'express';
import path from 'path';
import fs from 'fs';
import CryptoJS from 'crypto-js';
import { PrismaClient } from '@prisma/client';

const postWeblink: RequestHandler = async (req: any, res) => {
    const body = req.body;
    const wbs = req.body.wb;

    const extensions = ['.jpg', '.jpeg', '.png', '.webp'];
    const payload: any = [];

    if (wbs && wbs.length > 0) {
        for (let i = 0; i < wbs.length; i++) {
            const wb = body.wb[i];
            const image = req.files[i];
            console.log(req.files);

            if (image || (wb.Title && wb.Description && wb.URL && wb.WeblinkCategoryID)) {
                const prisma = new PrismaClient();
                const checkWebCateID = prisma.weblinkCategories.findFirst({
                    where: {
                        WeblinkCategoryID: wb.WeblinkCategoryID,
                    },
                });
                if (checkWebCateID !== null && checkWebCateID !== undefined) {
                    let status = false;
                    if (wb.Public === '1') {
                        status = true;
                    }
                    if (image !== null && image !== undefined) {
                        const extension = path.extname(image.originalname).toLowerCase();
                        const tempPath = image.path;

                        if (extensions.includes(extension)) {
                            const hashFilename = CryptoJS.SHA1(`${image.originalname}${JSON.stringify(new Date())}`);
                            const fileName = `${hashFilename.toString(CryptoJS.enc.Hex)}${extension}`;
                            const targetPath = path.join(__dirname, `../../image/image-weblink/${fileName}`);
                            fs.rename(tempPath, targetPath, (err) => {});

                            payload.push({
                                Title: wb.Title,
                                Description: wb.Description,
                                URL: wb.URL,
                                WeblinkCategoryID: wb.WeblinkCategoryID,
                                Image: fileName,
                                CreatedBy: req.user.Email,
                                Public: status,
                            });
                        } else {
                            fs.unlink(tempPath, (err) => {
                                // if (err) return res.status(500).json(err);
                            });
                        }
                    } else {
                        let fileName = null;
                        payload.push({
                            Title: wb.Title,
                            Description: wb.Description,
                            URL: wb.URL,
                            WeblinkCategoryID: wb.WeblinkCategoryID,
                            Image: fileName,
                            CreatedBy: req.user.Email,
                            Public: status,
                        });
                    }
                } else
                    return res.status(422).json({
                        status: 422,
                        message: 'webcate is a dream',
                    });
            } else
                return res.status(422).json({
                    status: 422,
                    message: 'Unprocessable Entity',
                });
        }
    }

    let resultRow: any = null;
    if (payload && payload.length > 0) {
        const prisma = new PrismaClient();
        try {
            return await prisma.$transaction(async function (tx) {
                resultRow = await tx.weblink.createMany({
                    data: payload,
                });
                return res.status(201).json({
                    data: payload,
                    row: resultRow,
                });
            });
        } catch (e) {
            if (e) {
                for (let item of payload) {
                    if (item.Image) {
                        const targetPathDelete = path.join(__dirname, `../../image/image-weblink/${item.Image}`);
                        fs.unlink(targetPathDelete, (err) => {});
                    }
                }
                return res.status(500).json({
                    status: 500,
                    message: 'Create Failed',
                    err: e,
                });
            }
        }
    }

    return res.status(201).json({
        data: payload,
        row: resultRow,
    });
};

export default postWeblink;
