const nodemailer = require('nodemailer');

const sendMail = async options => {
  let transporter = nodemailer.createTransport({
    host: process.env.NODEMAILER_HOST,
    port: process.env.NODEMAILER_PORT,
    secure: false,
    auth: {
      user: process.env.NODEMAILER_USERNAME,
      pass: process.env.NODEMAILER_PASSWORD
    }
  });

  const message = {
    from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`,
    to: options.email,
    subject: options.subject,
    text: options.text
  };

  let info = await transporter.sendMail(message);

  console.log(`Mail sent ${info.messageId}`);
};

module.exports = sendMail;
