import bcrypt from 'bcrypt';
import User from '../models/User.js';
import generateOTP from '../utils/generateOTP.js';
import sendEmail from '../utils/sendEmail.js';

async function registerUser(req, res) {
    try {
      const { email, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);

      const otp = generateOTP();
  
      const user = new User({ email, password: hashedPassword, verified: false, otp });
      await user.save();

      await sendEmail(email, 'Verification OTP', `Your OTP code is: ${otp}`);
  
      res.status(200).json({ message: 'User registered successfully. Please verify your email.' });
    } catch (error) {
      console.error('Error registering user:', error);
      res.status(500).json({ message: 'An error occurred while registering user.' });
    }
}  

async function verifyOTP(req, res) {
    try {
      const { email, otp } = req.body;

      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(400).json({ message: 'User not found.' });
      }

      if (user.otp !== otp.trim()) {
        return res.status(400).json({ message: 'Invalid OTP code.' });
      }

      await User.updateOne({ email }, { verified: true });
  
      res.status(200).json({ message: 'Email verification successful.' });
    } catch (error) {
      console.error('Error verifying OTP:', error);
      res.status(500).json({ message: 'An error occurred while verifying OTP.' });
    }
}

export { registerUser, verifyOTP };
