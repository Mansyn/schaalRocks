import * as functions from 'firebase-functions';
const nodemailer = require('nodemailer');

// Configure the email transport using the default SMTP transport and a GMail account.
const gmailEmail = functions.config().gmail.email;
const gmailPassword = functions.config().gmail.password;
const mailTransport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: gmailEmail,
        pass: gmailPassword,
    },
});
const APP_NAME = 'Stennifer';

// [START sendWelcomeEmail]
/**
 * Sends a welcome email to new user.
 */
// [START onCreateTrigger]
export const sendWelcomeEmail = functions.auth.user().onCreate((user) => {
    // [END onCreateTrigger]
    // [START eventAttributes]
    const email = user.email; // The email of the user.
    // [END eventAttributes]

    const mailOptions = {
        from: `${APP_NAME} <noreply@firebase.com>`,
        to: email,
        subject: `Welcome to ${APP_NAME}!`,
        text: `Thanks for signing up to our site!
Looking forward to seeing you soon!
Stephen & Jennifer`,
        html: `<p>Thanks for signing up to our site!</p>
  <p></p>
  <p>Looking forward to seeing you soon!</p>
  <p>Stephen & Jennifer</p>`
    };

    return mailTransport.sendMail(mailOptions).then(() => {
        console.log('New welcome email sent to:', email);
    });
});
// [END sendWelcomeEmail]

// [START sendByeEmail]
/**
 * Send an account deleted email confirmation to users who delete their accounts.
 */
// [START onDeleteTrigger]
export const sendByeEmail = functions.auth.user()
    .onDelete((user) => {
        // [END onDeleteTrigger]
        const email = user.email;
        const displayName = user.displayName;

        const mailOptions = {
            from: `${APP_NAME} <noreply@firebase.com>`,
            to: email,
            subject: `Bye!`,
            text: `Farewell ${displayName || ''}!, We confirm that we have deleted your ${APP_NAME} account.`
        };

        return mailTransport.sendMail(mailOptions).then(() => {
            console.log('Account deletion confirmation email sent to:', email);
        });
    });