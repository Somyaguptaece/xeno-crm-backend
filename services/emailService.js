const axios = require("axios");

const sendOTPEmail = async (
  email,
  otp
) => {

  await axios.post(

    "https://api.brevo.com/v3/smtp/email",

    {

      sender: {

        name: "Xeno CRM",

        email: "xenofde1@gmail.com"

      },

      to: [

        {
          email
        }

      ],

      subject:
        "Xeno CRM Verification OTP",

      htmlContent: `

        <div>

          <h2>Xeno CRM Email Verification</h2>

          <p>Your OTP is:</p>

          <h1>${otp}</h1>

          <p>
            This OTP expires in 10 minutes
          </p>

        </div>

      `

    },

    {

      headers: {

        "api-key":
          process.env.BREVO_API_KEY,

        "Content-Type":
          "application/json"

      }

    }

  );

};

module.exports = {
  sendOTPEmail
};