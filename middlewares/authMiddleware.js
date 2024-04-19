import User from '../models/User.js';

async function verifyUser(req, res, next) {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'User not found.' });
    }

    if (!user.verified) {
      return res.status(400).json({ message: 'Please verify your email first.' });
    }

    next();
  } catch (error) {
    console.error('Error verifying user:', error);
    res.status(500).json({ message: 'An error occurred while verifying user.' });
  }
}

export { verifyUser };
