const sendOTPEmail = async (email, otp) => {

  console.log("EMAIL DISABLED FOR TEST");
  console.log("Email:", email);
  console.log("OTP:", otp);

  return true;

};

module.exports = {
  sendOTPEmail,
};