const nodemailer = require('nodemailer');
require('dotenv').config();


const transporter = nodemailer.createTransport({
host: process.env.SMTP_HOST,
port: process.env.SMTP_PORT,
secure: process.env.SMTP_PORT == 465, // true for 465, false for other ports
auth: {
user: process.env.SMTP_USER,
pass: process.env.SMTP_PASS,
},
});


async function sendCertificateEmail({ to, name, attachment }) {
const mailOptions = {
from: `"${process.env.FROM_NAME || 'Org'}" <${process.env.FROM_EMAIL}>`,
to,
subject: `Your Internship Completion Certificate`,
text: `Hi ${name},\n\nCongratulations on completing your internship! Please find attached your certificate.\n\nBest,\n${process.env.FROM_NAME}`,
html: `<p>Hi ${name},</p><p>Congratulations on completing your internship! Please find attached your certificate.</p><p>Best,<br/>${process.env.FROM_NAME}</p>`,
attachments: [attachment],
};


return transporter.sendMail(mailOptions);
}


module.exports = { sendCertificateEmail };
