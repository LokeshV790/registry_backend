import User from '../models/User.js';

async function getUserInfo(req, res) {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        const { otp, ...userInfo } = user.toObject();

        res.status(200).json({ user: userInfo });
    } catch (error) {
        console.error('Error retrieving user information:', error);
        res.status(500).json({ message: 'An error occurred while retrieving user information.' });
    }
}

export { getUserInfo };
