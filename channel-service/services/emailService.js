const axios = require("axios");

const sendEmail = async (
  to,
  subject,
  message,
  logId
) => {

  console.log(
    "BREVO KEY FOUND:",
    !!process.env.BREVO_API_KEY
  );

  try {

    const response =
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
            <p>${message}</p>
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
      "BREVO SUCCESS"
    );

    console.log(
      response.data
    );

  } catch(error) {

    console.log(
      "BREVO ERROR"
    );

    console.log(
      error.response?.data
    );

    throw error;
  }

};

module.exports = {
  sendEmail
};