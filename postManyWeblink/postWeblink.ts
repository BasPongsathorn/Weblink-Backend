import { RequestHandler } from 'express';
import path from 'path';
import fs from 'fs';
import CryptoJS from 'crypto-js';
import { PrismaClient } from '@prisma/client';

const postUpload: RequestHandler = async (req: any, res) => {
    const body = req.body;
    const wbs = req.body.wb;

    const extensions = ['.jpg', '.jpeg', '.png', '.webp'];
    const payload: any = [];

    if (wbs && wbs.length > 0) {
        for (let i = 0; i < wbs.length; i++) {
            const wb = body.wb[i];
            const image = req.files[i];

            if (image || (wb.Title && wb.Description && wb.URL && wb.WeblinkCategoryID)) {
                if (image !== null && image !== undefined) {
                    const extension = path.extname(image.originalname).toLowerCase();
                    const tempPath = image.path;

                    if (extensions.includes(extension)) {
                        const hashFilename = CryptoJS.SHA1(`${image.originalname}${JSON.stringify(new Date())}`);
                        const fileName = `${hashFilename.toString(CryptoJS.enc.Hex)}${extension}`;
                        const targetPath = path.join(__dirname, `../src/image/image-weblink/${fileName}`);
                        fs.rename(tempPath, targetPath, (err) => {});

                        payload.push({
                            Title: wb.Title,
                            Description: wb.Description,
                            URL: wb.URL,
                            WeblinkCategoryID: wb.WeblinkCategoryID,
                            Image: fileName,
                        });
                    } else {
                        fs.unlink(tempPath, (err) => {
                            // if (err) return res.status(500).json(err);
                        });
                    }
                } else {
                    let fileName = '';
                    payload.push({
                        Title: wb.Title,
                        Description: wb.Description,
                        URL: wb.URL,
                        WeblinkCategoryID: wb.WeblinkCategoryID,
                        Image: fileName,
                    });
                }
            } else
                return res.status(422).json({
                    status: 422,
                    message: 'Unprocessable Entity',
                });
        }
    }

    let resultRow: any = null;
    if (payload && payload.length > 0) {
        try {
            const prisma = new PrismaClient();
            await prisma.$transaction(async function (tx) {
                resultRow = await prisma.weblink.createMany({
                    data: payload,
                });
            });
        } catch (e) {
            for (let item of payload) {
                if (item.Image) {
                    const targetPathDelete = path.join(__dirname, `../src/image/image-weblink/${item.Image}`);
                    fs.unlink(targetPathDelete, (err) => {});
                }
            }
        }
    }

    return res.status(201).json({
        data: payload,
        row: resultRow,
    });
};

export default postUpload;
