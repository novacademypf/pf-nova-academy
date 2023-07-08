const nodemailer = require("nodemailer");
const { NODEMAILER_PASS, NODEMAILER_EMAIL } = process.env;
console.log("entra a nodemailer")
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: NODEMAILER_EMAIL,
    pass: NODEMAILER_PASS
  }
});
transporter.verify().then(()=>{
  console.log("Ready for send emails")
})