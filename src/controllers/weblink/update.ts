import { RequestHandler } from 'express';
import path from 'path';
import fs from 'fs';
import CryptoJS from 'crypto-js';
import { PrismaClient } from '@prisma/client';
import { unlink } from 'node:fs';

const updateWeblink: RequestHandler = async (req: any, res) => {
    const body = req.body;
    const wbs = req.body.wb;

    const extensions = ['.jpg', '.jpeg', '.png', '.webp'];
    const payload: any = [];

    if (wbs && wbs.length > 0) {
        for (let i = 0; i < wbs.length; i++) {
            const wb = body.wb[i];
            const image = req.files[i];
            const minipayload: any = {};
            let fileName: any = null;

            if (wb.WeblinkID) {
                if (image && (image !== null || image !== undefined)) {
                  const extension = path.extname(image?.originalname).toLowerCase();
                  const tempPath = image?.path;
                  if (extensions.includes(extension)) {
                      const hashFilename = CryptoJS.SHA1(`${image.originalname}${JSON.stringify(new Date())}`);
                      fileName = `${hashFilename.toString(CryptoJS.enc.Hex)}${extension}`;
                      const targetPath = path.join(__dirname, `../../image/image-announcement/${fileName}`);
                      fs.rename(tempPath, targetPath, (err) => {});
                  } else {
                      fs.unlink(tempPath, (err) => {
                          // if (err) return res.status(500).json(err);
                      });
                  }
                }

                if (wb.Title && wb.Title !== '') {
                    minipayload['Title'] = wb.Title;
                }
                if (wb.Description && wb.Description !== '') {
                    minipayload['Description'] = wb.Description;
                }
                if (wb.URL && wb.URL !== '') {
                    minipayload['URL'] = wb.URL;
                }
                if (wb.WeblinkCategoryID && wb.WeblinkCategoryID !== '') {
                    minipayload['WeblinkCategoryID'] = wb.WeblinkCategoryID;
                }
                if (fileName) {
                    minipayload['Image'] = fileName;
                }
                if (wb.WeblinkID) {
                    minipayload['WeblinkID'] = wb.WeblinkID;
                }

                payload.push(minipayload);
            }
        }
    }

    let resultRow: any = [];
    let check = false;
    if (payload && payload.length > 0) {
        const prisma = new PrismaClient();
        await prisma.$transaction(async function (tx) {
            for (let item of payload) {
                if (item) {
                    const updateWeblink = await prisma.weblink.update({
                        where: {
                            WeblinkID: item.WeblinkID,
                        },
                        data: item,
                    });
                    check = true;
                    resultRow.push(updateWeblink);
                }
            }
        });
    }

    if (resultRow != null) {
        for (let delimage of payload) {
            if (delimage) {
                unlink(`../../image/image-announcement/${delimage.Image}`, () => {});
            }
        }
    }

    return res.status(201).json(resultRow);
};

export default updateWeblink;
