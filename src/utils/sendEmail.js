const nodemailer = require('nodemailer');
const {google} = require('googleapis');
const { config } = require('dotenv');
require('dotenv').config();

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI =  process.env.REDIRECT_URI;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
oAuth2Client.setCredentials({refresh_token: REFRESH_TOKEN});

const sendEmail = (emailData) => {
    try {
        const accessToken = oAuth2Client.getAccessToken();

        const transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: 'hareshnaresh125@gmail.com',
                clientId: CLIENT_ID,
                clientSecret: CLIENT_SECRET,
                refreshToken: REFRESH_TOKEN,
                accessToken: accessToken 
            }
        });
        const mailOptions = {
            from: emailData.from || 'hareshnaresh125@gmail.com',
            to: emailData.to,
            subject: emailData.subject,
            text: emailData.message,
            html: emailData.html
        };
        const result = transport.sendMail(mailOptions);
        return result;

    }
    catch (err) {
        console.log(err);
    }
}

// sendMailToUser().then(result => console.log('Email sent...', result)).catch(err => console.log(err));
module.exports = sendEmail;