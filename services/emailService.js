const nodemailer =
  require("nodemailer");

const transporter =
  nodemailer.createTransport({

    service: "gmail",

    auth: {
      user:
        process.env.EMAIL_USER,

      pass:
        process.env.EMAIL_PASS,
    },

  });

const sendOTPEmail =
  async (
    email,
    otp
  ) => {

    await transporter.sendMail({

      from:
        process.env.EMAIL_USER,

      to: email,

      subject:
        "Xeno CRM Verification OTP",

      html: `
        <div style="font-family:Arial">

          <h2>
            Welcome To Xeno CRM
          </h2>

          <p>
            Your verification OTP is:
          </p>

          <h1>
            ${otp}
          </h1>

          <p>
            OTP valid for
            10 minutes.
          </p>

        </div>
      `,

    });

};

module.exports = {
  sendOTPEmail,
};