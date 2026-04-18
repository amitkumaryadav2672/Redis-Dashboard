const express = require('express');
const router = express.Router();
const { getProducts } = require('../controllers/productController');
const { protect } = require('../middlewares/authMiddleware');

// Public route example (with cache)
router.get('/public', getProducts);

// Protected route example (must be logged in)
router.get('/private', protect, (req, res) => {
    res.json({ message: `Welcome ${req.user.email}, this is a protected route!` });
});

module.exports = router;
