import express, { Response, Request } from 'express';
import cors from 'cors';
import multer from 'multer';
import bodyParser from 'body-parser';
import cron from 'node-cron';
import { PrismaClient } from '@prisma/client';
import dayjs from 'dayjs';

const app = express();

const PORT = 3000;

// const reqall: any = multer();
// app.use(reqall.any());

const options: cors.CorsOptions = {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
};

// const upload = multer();

const getroute = require('./src/routes/example/get');
const postroute = require('./src/routes/example/post');
const patctroute = require('./src/routes/example/patch');
const deleteroute = require('./src/routes/example/delete');

//Weblink Category
const getweblinkcate = require('./src/routes/weblinkcategories/getweblinkcate');
const postweblinkcate = require('./src/routes/weblinkcategories/postweblinkcate');
const deleteweblinkcate = require('./src/routes/weblinkcategories/deleteweblinkcate');
const patchweblinkcate = require('./src/routes/weblinkcategories/patchweblinkcate');
const deleteallweblinkcate = require('./src/routes/weblinkcategories/deleteallweblinkcate');

//Announcement
const postannounce = require('./src/routes/announcement/postannounce');
const getannounce = require('./src/routes/announcement/getannounce');
const deleteannounce = require('./src/routes/announcement/deleteannounce');
const deleteall = require('./src/routes/announcement/deleteall');
const patchannounce = require('./src/routes/announcement/patchannounce');

//Weblink
const getweblink = require('./src/routes/weblink/getweblink');
const postweblink = require('./src/routes/weblink/postweblink');
const postmanyweblink = require('./src/routes/weblink/postmanyweblink');
const patchweblink = require('./src/routes/weblink/patchweblink');
const deleteweblink = require('./src/routes/weblink/deleteweblink');
const patchmanyweblink = require('./src/routes/weblink/patchmanyweblink');
const deleteallweblink = require('./src/routes/weblink/deleteallweblink');

//Announcement Category
const getanncate = require('./src/routes/categoryannouncement/getcategoryannounce');
const postanncate = require('./src/routes/categoryannouncement/postcategoryannounce');
const patchanncate = require('./src/routes/categoryannouncement/patchcategoryannounce');
const deleteanncate = require('./src/routes/categoryannouncement/deletecategoryannounce');

//Faq
const getfaq = require('./src/routes/faq/getfaq');
const postfaq = require('./src/routes/faq/postfaq');
const patchfaq = require('./src/routes/faq/patchfaq');
const deletefaq = require('./src/routes/faq/deletefaq');

//Faq User
const getfaquser = require('./src/routes/faquser/getfaquser');
const postfaquser = require('./src/routes/faquser/postfaquser');
const deletefaquser = require('./src/routes/faquser/deletefaquser');

//Domain
const getdomain = require('./src/routes/domain/getdomain');
const postdomain = require('./src/routes/domain/postdomain');
const patchdomain = require('./src/routes/domain/patchdomain');
const deletedomain = require('./src/routes/domain/deletedomain');

//Login-Email
const postloginemail = require('./src/routes/loginemail/postloginemailuser');

//Get view
const getviewer = require('./src/routes/getdata/getviewer');

//verify
const postloginverify = require('./src/routes/loginverify/postloginverify');


app.use(cors(options));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

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

app.use(getroute);
app.use(postroute);
app.use(patctroute);
app.use(deleteroute);
app.use(getweblinkcate);
app.use(postweblinkcate);
app.use(deleteweblinkcate);
app.use(patchweblinkcate);
app.use(deleteallweblinkcate);
app.use(postannounce);
app.use(getannounce);
app.use(deleteannounce);
app.use(deleteall);
app.use(patchannounce);
app.use(getweblink);
app.use(postweblink);
app.use(patchweblink);
app.use(deleteweblink);
app.use(postmanyweblink);
app.use(patchmanyweblink);
app.use(deleteallweblink);
app.use(getanncate);
app.use(postanncate);
app.use(patchanncate);
app.use(deleteanncate);
app.use(getfaq);
app.use(postfaq);
app.use(deletefaq);
app.use(patchfaq);
app.use(getfaquser);
app.use(postfaquser);
app.use(deletefaquser);
app.use(getdomain);
app.use(postdomain);
app.use(deletedomain);
app.use(patchdomain);
app.use(postloginemail);
app.use(getviewer);
app.use(postloginverify);




// const options: cors.CorsOptions = {
//     origin: "*",
//     methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//     preflightContinue: false,
//     optionsSuccessStatus: 204
// }

app.get('/', (req: Request, res: Response) => {
    res.send('OK');
});

app.listen(PORT, () => {
    console.log(`Server is running on Port : ${PORT}`);
});
