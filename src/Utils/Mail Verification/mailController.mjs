import nodemailer from 'nodemailer'
import otpGenerator from 'otp-generator'
import { findUserById } from '../../Modules/User/Repository/userRepository.mjs';

const emailVerify = async (req, res) => {
    const { email } = req.body;
    const userId = req.payload;
    try {
        const user = await findUserById(userId);

        
        if (user) {
            const otp = otpGenerator.generate(6, { lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false });
            const otpExpiry = Date.now() + 4 * 60 * 1000;
            req.session.otp = otp;
            req.session.email = user.email;
            req.session.otpExpiry = otpExpiry;
           
            

            const auth = nodemailer.createTransport({
                host: "sandbox.smtp.mailtrap.io",
                port: 2525,
                auth: {
                    user: process.env.mail_id,
                    pass: process.env.pass_key
                }
            });

            const receiver = {
                from: "verifym1801@gmail.com",
                to: user.email,
                subject: "Your OTP for Account Verification",
                text: `Dear User,
        
        Thank you for registering. Please use the following One-Time Password (OTP) to verify your email address:
        
        OTP: ${otp}`
            };


            auth.sendMail(receiver, (error, emailResponse) => {
                if (error) {
                    console.error("Error sending email:", error);
                    return res.status(500).send("Error sending email"); // Send an error response if email fails to send
                }
                res.send("Email sent successfully!"); // Send a success response
            });
        }
    }
    catch (err) {
        res.status(500).json(err)
    }
}

const verifyOtp = async (req, res) => {
    const {email,otp } = req.body;
    const userId = req.payload;
    const user = await findUserById(userId);
 
    
    // Check if OTP, email, and expiration time exist in the session
    if (!req.session.otp || !req.session.email || !req.session.otpExpiry) {
      return res.status(400).json({ message: "No OTP found. Please request a new one." });
    }
  
    // Check if the OTP has expired
    const currentTime = Date.now();
    if (currentTime > req.session.otpExpiry) {
      // OTP has expired
      req.session.otp = null;
      req.session.email = null;
      req.session.otpExpiry = null;
      return res.status(400).json({ message: "OTP has expired. Please request a new one." });
    }
  
    // Verify the OTP and email
    if (req.session.otp === otp && req.session.email === user.email) {
      // OTP is correct and within the valid time
    //   await users.findOneAndUpdate({ email: email }, { email_verify: true });
      res.status(200).json({ message: "OTP verified successfully!" })
  
      // Clear the OTP and related data from the session after verification
      req.session.otp = null;
      req.session.email = null;
      req.session.otpExpiry = null;
    } else {
      // OTP or email is incorrect
      res.status(400).json("Invalid OTP or email.");
    }
  };

const mailController = {
    emailVerify,
    verifyOtp
}

export default mailController;