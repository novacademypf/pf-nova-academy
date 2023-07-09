const nodemailer = require("nodemailer");
const { NODEMAILER_PASS, NODEMAILER_EMAIL } = process.env;
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'danielpaz2233@gmail.com',
    pass: 'onqyfpufjuznkmfv',
  }
});
transporter.verify(function (error, success) {
  if (error) {
    console.log(error);
  } else {
    console.log("Server is ready to take our messages");
  }
})