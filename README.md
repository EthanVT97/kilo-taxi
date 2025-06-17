# 🚕 Myanmar Kilo Taxi – Real-Time Kilo-Based Taxi Booking System

**Made with ❤️ by [Ethan](https://github.com/EthanVT97) | Contact: info@ygnb2b.com**

A modern, full-stack, real-time taxi booking platform tailored for **Yangon**. Built for both passengers and drivers, this app supports **kilo-based fare tracking**, **live location sharing**, and **multilingual UI (Myanmar + English)**.

> 🛰 Powered by React + FastAPI + Socket.IO  
> 🇲🇲 Unicode & Zawgyi support included  
> ☁️ Easy to deploy on Render, Railway, or VPS  

---

## 📦 Project Structure

```bash
myanmar-kilo-taxi/
├── frontend/                  # React + Tailwind user interface
│   ├── public/
│   │   └── locales/          # i18n (en/my)
│   ├── src/
│   │   ├── components/       # Modular UI blocks (Booking, Tracking)
│   │   ├── hooks/            # Custom hooks (useSocket, useAuth)
│   │   ├── services/         # API & WebSocket communication
│   │   ├── utils/            # Constants & helpers
│   │   └── pages/            # Home, Booking, Tracking
├── backend/                  # FastAPI server logic
│   ├── controllers/          # API route logic
│   ├── models/               # MongoDB/Mongoose-like schemas
│   ├── middleware/           # Auth, validation, rate limiting
│   ├── services/             # Payment, socket, email logic
│   └── config/               # Environment, DB setup
├── docker-compose.yml        # Full stack container orchestration
└── .github/workflows/        # Auto-deployment pipeline
```

---

// Auth Routes
POST /api/auth/register
POST /api/auth/login
POST /api/auth/refresh
POST /api/auth/logout

// Booking Routes
GET    /api/bookings
POST   /api/bookings
GET    /api/bookings/:id
PUT    /api/bookings/:id/status
DELETE /api/bookings/:id

// Driver Routes
GET    /api/drivers/available
POST   /api/drivers/location
GET    /api/drivers/:id

// Payment Routes
POST   /api/payments/process
GET    /api/payments/history
POST   /api/payments/webhook

---

## 🚀 Features

- 🧭 **Live Map Tracking** (Socket.IO)
- 🛺 **Real-time Kilo-based Fare Meter**
- 👥 **Driver & Passenger Mode**
- 🌐 **Myanmar Unicode + English i18n**
- 💸 **Future: WavePay / Kpay integration**
- 🛡️ **JWT Auth + Rate Limiting + Secure Headers**

---

## 🛠️ Technologies Used

| Frontend | Backend | Realtime | DevOps |
|----------|---------|----------|--------|
| React    | FastAPI | Socket.IO | Docker |
| Tailwind | Uvicorn | Redis     | GitHub Actions |
| i18next  | JWT     |           | CI/CD |

---

## 🌐 Live Preview / Demo

Coming soon...

---

## 🧪 Local Development Guide

### Prerequisites

- Node.js ≥ 18  
- Python ≥ 3.10  
- Docker + Docker Compose  
- Redis Server (optional but recommended)

### 1. Clone the Repository

```bash
git clone https://github.com/EthanVT97/kilo-taxi.git
cd kilo-taxi
```

### 2. Environment Setup

Create `.env` files for both frontend and backend.

#### `.env` for `backend/`

```env
PORT=8000
MONGO_URI=mongodb://localhost:27017/kilotaxi
JWT_SECRET=your_strong_jwt_secret
REDIS_URL=redis://localhost:6379
EMAIL_FROM=info@ygnb2b.com
```

#### `.env` for `frontend/`

```env
VITE_API_URL=http://localhost:8000
VITE_SOCKET_URL=http://localhost:8000
```

### 3. Run via Docker Compose

```bash
docker-compose up --build
```

Or manually run backend:

```bash
cd backend
uvicorn src.main:app --reload --host 0.0.0.0 --port 8000
```

And frontend:

```bash
cd frontend
npm install && npm run dev
```

---

## 📡 Deployment

Auto-deploys via GitHub Actions: `.github/workflows/deploy.yml`

Can be deployed to:

- 🔁 **Render.com** (free)
- 🚀 **Railway.app**
- 🏗️ **VPS with Docker**

---

## 📱 Screenshots

Coming soon...

---

## 📈 Scalability Plan

- Switch to PostgreSQL for relational data (driver ratings, trips)
- Add real-time fare estimation model (AI integration possible)
- Integrate WavePay / KBZPay with verified KYC
- Progressive Web App (PWA) support for offline rides

---

## 🔐 Security Practices

- JWT authentication with expiry
- IP rate limiting via middleware
- Helmet headers (CSP, XSS)
- Input validation using Zod / Pydantic

---

## 🤝 Contributing

Pull requests welcome! Fork the repo and submit a PR.
For major changes, open an issue first to discuss what you would like to change.

---

## 📬 Contact

Email: **info@ygnb2b.com**  
GitHub: [github.com/EthanVT97/kilo-taxi](https://github.com/EthanVT97/kilo-taxi)

---

## 📄 License

MIT License © 2025 Ethan VT
