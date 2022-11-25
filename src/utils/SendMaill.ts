import nodemailer from 'nodemailer';
import { templateOTP } from './mailtemplates/templateOTP';

const O365_EMAIL = process.env.O365_EMAIL;
const O365_APPPASSWORD = process.env.O365_APPPASSWORD;

const SendMailOTP = async (OTP: number, SendTo: string) => {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: 'smtp.mailtrap.io',
        port: 25,
        secure: false, // true for 465, false for other ports
        auth: {
            user: O365_EMAIL, // generated ethereal user
            pass: O365_APPPASSWORD, // generated ethereal password
        },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: `"Weblink Administrator" <${O365_EMAIL}>`, // sender address
        to: SendTo, // list of receivers
        subject: 'Hello ✔', // Subject line
        html: templateOTP(OTP), // html body
    });

    console.log('Message sent: %s', info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
};

export { SendMailOTP };
