import User from '../models/User.model.js';

export const displayAllData = async (req, res) => {
    try {
        // Fetch all users from the database
        const users = await User.find({});

        if (!users) {
            return res.status(404).json({ success: false, message: "No users found." });
        }

        // Send the users data as a response
        res.json({ success: true, users });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};