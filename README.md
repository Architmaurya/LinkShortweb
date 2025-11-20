
# URL Shortener Backend

A secure backend API for generating short URLs using Node.js, Express, and MongoDB.

## 📁 Project Structure
backend/
 ├── config/
 ├── controllers/
 ├── routes/
 ├── models/
 ├── server.js
 └── README.md

## ⚙️ Setup
```
npm install
npm run dev
```

## 🔧 Environment Variables (.env.example)
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/urlShortener
BASE_URL=https://your-frontend-domain.com
```

## 🔌 API
### POST /shorten
Input:
```
{ "longUrl": "https://example.com" }
```

### GET /:shortId
Redirects to the original URL.

# URL Shortener Frontend

A modern frontend built with **React + Vite** that allows users to shorten URLs and handle automatic redirection.

## 📁 Project Structure
frontend/
 ├── src/
 ├── public/
 ├── index.html
 ├── README.md
 └── .env.example

## ⚙️ Setup
```
npm install
npm run dev
```

## 🌐 Environment Variables (.env.example)
```
VITE_BACKEND_URL=https://your-backend-domain.com
```

## 🚀 Deployment
Include this in **vercel.json**:
```
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/" }
  ]
}
```
