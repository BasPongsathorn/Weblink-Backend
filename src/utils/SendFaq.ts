import nodemailer from 'nodemailer';
import { templateFAQ } from './mailtemplates/templateFAQ';
import { templateOTP } from './mailtemplates/templateOTP';

const O365_PORT = process.env.O365_PORT ? parseInt(process.env.O365_PORT) : 25;
const O365_HOST = process.env.O365_HOST;
const O365_EMAIL = process.env.O365_EMAIL;
const O365_APPPASSWORD = process.env.O365_APPPASSWORD;

const SendMailFAQ = async (Message: string, SendTo: string) => {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: O365_HOST,
        port: O365_PORT,
        secure: false, // true for 465, false for other ports
        auth: {
            user: O365_EMAIL, // generated ethereal user
            pass: O365_APPPASSWORD, // generated ethereal password
        },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: `User`, // sender address
        to: SendTo, // list of receivers
        subject: 'Ask a question', // Subject line
        html: templateFAQ(Message), // html body
    });

    console.log('Message sent: %s', info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    return;
};

export { SendMailFAQ };
