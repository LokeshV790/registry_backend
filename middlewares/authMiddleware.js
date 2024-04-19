import jwt from 'jsonwebtoken';
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

async function verifyToken(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
      return res.status(401).json({ message: 'No token provided.' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
          return res.status(403).json({ message: 'Failed to authenticate token.' });
      }
      req.userId = decoded.userId;
      next();
  });
}

export { verifyUser, verifyToken};
