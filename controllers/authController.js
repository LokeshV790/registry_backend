import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
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

async function addExtraInfo(req, res) {
    try {
        const { email, location, age, workDetails } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: 'User not found.' });
        }

        if (!user.verified) {
            return res.status(400).json({ message: 'User is not verified. Please verify your email first.' });
        }

        user.location = location;
        user.age = age;
        user.workDetails = workDetails;

        await user.save();

        res.status(200).json({ message: 'Additional information added successfully.' });
    } catch (error) {
        console.error('Error adding extra information:', error);
        res.status(500).json({ message: 'An error occurred while adding extra information.' });
    }
}

async function login(req, res) {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid credentials.' });
        }

        const token = jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET);

        res.status(200).json({ token });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ message: 'An error occurred while logging in.' });
    }
}

export { registerUser, verifyOTP, addExtraInfo, login };