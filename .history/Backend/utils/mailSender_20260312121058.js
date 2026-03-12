const nodemailer = require("nodemailer");

const mailSender = async (email, title, body) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS
    }
  });

  const info = await transporter.sendMail({
    from: "OTP Verification",
    to: email,
    subject: title,
    html: body
  });

  return info;
};

module.exports = mailSender;