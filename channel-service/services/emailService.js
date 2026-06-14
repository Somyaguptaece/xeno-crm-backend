const axios = require("axios");

const sendEmail = async (
  to,
  subject,
  message,
  logId
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
          email: to
        }

      ],

      subject,

      htmlContent: `

        <div>

          <p>${message}</p>

          <br/>

          <a href="${process.env.BACKEND_URL}/tracking/click/${logId}">
            View Offer
          </a>

          <img
            src="${process.env.BACKEND_URL}/tracking/open/${logId}"
            width="1"
            height="1"
          />

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

  console.log(
    `Email Sent To ${to}`
  );

};

module.exports = {
  sendEmail
};