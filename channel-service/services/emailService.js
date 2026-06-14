const axios = require("axios");

const sendEmail = async (
  to,
  subject,
  message,
  logId
) => {

  console.log("========== EMAIL DEBUG ==========");
  console.log("TO:", to);
  console.log(
    "BREVO_API_KEY EXISTS:",
    !!process.env.BREVO_API_KEY
  );
  console.log(
    "BREVO_API_KEY PREFIX:",
    process.env.BREVO_API_KEY?.slice(0, 10)
  );
  console.log("=================================");

  try {

    const response = await axios.post(

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

    console.log("BREVO SUCCESS");
    console.log(response.data);

  } catch (error) {

    console.log("========== BREVO ERROR ==========");

    console.log(
      "STATUS:",
      error.response?.status
    );

    console.log(
      "DATA:",
      error.response?.data
    );

    console.log(
      "MESSAGE:",
      error.message
    );

    console.log("=================================");

    throw error;
  }

};

module.exports = {
  sendEmail
};