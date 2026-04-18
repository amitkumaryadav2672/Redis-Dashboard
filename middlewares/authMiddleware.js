const jwt = require('jsonwebtoken');
const redisClient = require('../config/redis');

const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];

            // 1. Verify JWT
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // 2. Check if session exists in Redis
            const sessionToken = await redisClient.get(`session:${decoded.email}`);

            if (!sessionToken || sessionToken !== token) {
                return res.status(401).json({ message: "Not authorized, session expired or invalid" });
            }

            req.user = decoded;
            next();

        } catch (error) {
            res.status(401).json({ message: "Not authorized, token failed" });
        }
    }

    if (!token) {
        res.status(401).json({ message: "Not authorized, no token" });
    }
};

module.exports = { protect };
