const nodemailer =
  require("nodemailer");

const transporter =
  nodemailer.createTransport({

    host: "smtp.gmail.com",

    port: 465,

    secure: true,

    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },

  });

const sendOTPEmail = async (email, otp) => {
  try {

    console.log("Sending OTP to:", email);
    console.log("OTP:", otp);

    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Xeno CRM Verification OTP",
      html: `<h1>${otp}</h1>`
    });

    console.log("EMAIL SENT");
    console.log(info);

  } catch (error) {

    console.log("EMAIL ERROR");
    console.log(error);

    throw error;
  }
};

module.exports = {
  sendOTPEmail,
};