# 🚀 Redis Dashboard - Professional Backend Sample

A production-grade Node.js backend demonstration showcasing the power of **Redis** for high-performance caching, secure session management, and efficient OTP (One-Time Password) handling.

---

## 🏗️ Project Architecture

This project follows a modular MVC (Model-View-Controller) pattern, ensuring scalability and maintainability.

- **Backend**: Node.js & Express.js
- **Database/Cache**: Redis
- **Security**: JSON Web Tokens (JWT)
- **Frontend**: Vanilla HTML/JavaScript (Static)

---

## ✨ Key Features

### 1. ⚡ API Response Caching
Reduces database load and improves response times by caching frequently accessed data (like product lists) in Redis with an automated expiry system.

### 2. 🔐 Secure Session Management
Traditional sessions can be slow. This project stores JWT-based sessions in Redis, allowing for instant session invalidation and high-speed authentication checks.

### 3. 📱 High-Performance OTP System
Handles One-Time Passwords with precision. OTPs are stored in Redis with a short TTL (Time-To-Live), ensuring they automatically expire after 60 seconds.

---

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Memory Store**: Redis (via `redis` npm package)
- **Authentication**: JWT (JSON Web Tokens)
- **Environment**: Dotenv for secure configuration

---

## 🚀 Getting Started

### 1. Prerequisites
- [Node.js](https://nodejs.org/) installed
- [Redis Server](https://redis.io/) running locally or in the cloud

### 2. Installation
Clone the repository and install dependencies:
```bash
git clone https://github.com/amitkumaryadav2672/Redis-Dashboard.git
cd redis-pro-sample
npm install
```

### 3. Configuration
Create a `.env` file in the root directory (refer to `.env.example` if available):
```env
PORT=5000
REDIS_URL=redis://localhost:6379
JWT_SECRET=your_jwt_secret_key
OTP_EXPIRY=60
CACHE_EXPIRY=300
```

### 4. Running the Project
```bash
# Development mode
npm run dev

# Production mode
npm start
```

---

## 📡 API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| **GET** | `/products` | Fetches products (Caches result for 5 mins) |
| **POST** | `/login` | Authenticates user & saves session in Redis |
| **POST** | `/send-otp` | Generates & stores OTP in Redis (60s expiry) |
| **POST** | `/verify-otp` | Verifies OTP against Redis data |

---

## 📂 Project Structure

```text
redis-pro-sample/
├── config/             # Redis Connection configurations
├── controllers/        # Business logic for Auth & Products
├── middlewares/        # Security & Auth middlewares
├── public/             # Static Frontend Dashboard
├── routes/             # Express Route definitions
├── server.js           # Main Entry Point
├── .env                # Environment Variables
└── .gitignore          # Git exclusion rules
```

---

## 📝 License
This project is open-source and available under the [MIT License](LICENSE).

---
*Created with ❤️ by Amit Kumar Yadav*
