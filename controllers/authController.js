const jwt = require('jsonwebtoken');
const redisClient = require('../config/redis');

// 1. User Login: Generate JWT and store session in Redis
exports.login = async (req, res) => {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: "Email is required" });

    try {
        const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Store token in Redis as a session (key: session:email)
        await redisClient.setEx(`session:${email}`, 3600, token);

        res.json({
            message: "Login Successful",
            token
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 2. Send OTP: Generate OTP and save to Redis with expiry
exports.sendOTP = async (req, res) => {
    const { phone } = req.body;
    if (!phone) return res.status(400).json({ error: "Phone number is required" });

    try {
        const otp = Math.floor(1000 + Math.random() * 9000).toString(); // 4 digit OTP

        // Save OTP in Redis for 60 seconds (expiry from env)
        await redisClient.setEx(`otp:${phone}`, parseInt(process.env.OTP_EXPIRY), otp);

        res.json({
            message: "OTP sent successfully",
            otp // Sending in response for testing purposes
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 3. Verify OTP: Check Redis for the OTP
exports.verifyOTP = async (req, res) => {
    const { phone, otp } = req.body;
    if (!phone || !otp) return res.status(400).json({ error: "Phone and OTP are required" });

    try {
        const savedOtp = await redisClient.get(`otp:${phone}`);

        if (!savedOtp) {
            return res.status(400).json({ message: "OTP expired or not found" });
        }

        if (savedOtp === otp) {
            // Success: Clean up OTP from Redis
            await redisClient.del(`otp:${phone}`);
            return res.json({ message: "OTP Verified successfully" });
        }

        res.status(400).json({ message: "Invalid OTP" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
