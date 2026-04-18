const express = require('express');
const dotenv = require('dotenv');
const { getProducts } = require('./controllers/productController');
const { login, sendOTP, verifyOTP } = require('./controllers/authController');

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.static('public'));

const PORT = 5000;

// --- SIMPLE ROUTES ---
app.get('/products', getProducts); // Works as localhost:5000/products
app.post('/login', login);
app.post('/send-otp', sendOTP);
app.post('/verify-otp', verifyOTP);

app.listen(PORT, () => {
    console.log(`🚀 Redis Dashboard is running on http://localhost:${PORT}`);
});
