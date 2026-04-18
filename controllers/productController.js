const redisClient = require('../config/redis');

// Get Products: Demonstrates API Caching
exports.getProducts = async (req, res) => {
    const cacheKey = 'products:list';

    try {
        // Check Redis for cached data
        const cachedProducts = await redisClient.get(cacheKey);

        if (cachedProducts) {
            console.log('Serving from Redis Cache...');
            return res.json({
                source: "Redis Cache",
                data: JSON.parse(cachedProducts)
            });
        }

        // Simulate Database Fetch
        console.log('Fetching from Database...');
        const products = [
            { id: 1, name: "Dell XPS 13", price: 95000, category: "Laptop" },
            { id: 2, name: "iPhone 15 Pro", price: 125000, category: "Phone" },
            { id: 3, name: "Sony WH-1000XM5", price: 28000, category: "Headphones" },
            { id: 4, name: "Samsung G9 Monitor", price: 85000, category: "Monitor" }
        ];

        // Store result in Redis for future requests (expiry: 5 mins)
        await redisClient.setEx(cacheKey, parseInt(process.env.CACHE_EXPIRY), JSON.stringify(products));

        res.json({
            source: "Database",
            data: products
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
