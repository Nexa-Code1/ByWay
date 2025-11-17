import nodemailer from "nodemailer";
import { EventEmitter } from "node:events";

const sendEmailService = async ({ to, subject, html }) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const info = await transporter.sendMail({
    from: process.env.EMAIL,
    to,
    subject,
    html,
  });
};

const emitter = new EventEmitter();

emitter.on("sendEmail", async (...args) => {
  const { to, subject, html } = args[0];
  await sendEmailService({ to, subject, html });
});

export default emitter;
