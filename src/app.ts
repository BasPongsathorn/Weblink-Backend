import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import config from './config';
import errorHandler from './middleware/errorHandler';
import fourOhFour from './middleware/fourOhFour';
import announcement from './routes/announcement';
import categoryannouncement from './routes/categoryannouncement';
import consent from './routes/consent';
import domain from './routes/domain';
import faq from './routes/faq';
import faquser from './routes/faquser';
import getdata from './routes/getdata';
import loginemail from './routes/loginemail';
import loginverify from './routes/loginverify';
import weblink from './routes/weblink';
import weblinkcategory from './routes/weblinkcategory';
import { PrismaClient } from '@prisma/client';
import dayjs from 'dayjs';
import cron from 'node-cron';

const app = express();

// Apply most middleware first
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
    cors({
        // @ts-ignore
        origin: config.clientOrigins[config.nodeEnv],
    }),
);

app.use('/image-announcement', express.static('image/image-announcement'));
app.use('/image-weblink', express.static('image/image-weblink'));
app.use(helmet());
app.use(morgan('tiny'));

cron.schedule('* * * * *', async () => {
    const prisma = new PrismaClient();
    await prisma.token.deleteMany({
        where: {
            Expiretion: {
                lte: new Date(dayjs().format('YYYY-MM-DD HH:mm:ss')),
            },
        },
    });
    console.log('running a task every minute');
});

// Apply routes before error handling
app.use('/announcement', announcement);
app.use('/categoryannouncement', categoryannouncement);
app.use('/consent', consent);
app.use('/domain', domain);
app.use('/faq', faq);
app.use('/faquser', faquser);
app.use('/getdata', getdata);
app.use('/loginemail', loginemail);
app.use('/loginverify', loginverify);
app.use('/weblink', weblink);
app.use('/weblinkcategory', weblinkcategory);

app.get('/', (req, res) => {
    res.send('Hello');
});

// Apply error handling last
app.use(fourOhFour);
app.use(errorHandler);

export default app;
