<div align="center">

# ⚡ Xeno CRM — Backend

### *AI-Powered Customer Relationship & Campaign Management System*

[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-v5-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)](https://postgresql.org/)
[![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)](https://prisma.io/)
[![Redis](https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white)](https://redis.io/)
[![BullMQ](https://img.shields.io/badge/BullMQ-FF6B6B?style=for-the-badge&logo=bull&logoColor=white)](https://docs.bullmq.io/)
[![Google Gemini](https://img.shields.io/badge/Google_Gemini-4285F4?style=for-the-badge&logo=google&logoColor=white)](https://ai.google.dev/)

<br/>

> 🚀 A production-grade backend that combines **intelligent audience segmentation**, **async campaign delivery**, **AI-generated messaging**, and **real-time analytics** — all in one clean, scalable architecture.

</div>

---

## 🎯 What Makes This Special?

This isn't a typical CRUD app. Xeno CRM Backend tackles **real-world engineering problems**:

| Challenge | Solution |
|---|---|
| 🔄 Campaigns can't block the main thread | **BullMQ + Redis** for async job processing |
| 🤖 Writing campaign copy is slow | **Google Gemini AI** generates personalized messages |
| 📡 Users need live delivery status | **Socket.io** pushes real-time updates |
| 📦 High-volume message delivery | **Decoupled worker architecture** with dedicated processes |
| 🔐 Secure multi-user access | **JWT + bcryptjs** authentication layer |
| 🗄️ Complex relational data | **Prisma ORM** with type-safe PostgreSQL queries |

---

## 🏗️ System Architecture


---

## ✨ Core Features

### 🧠 AI-Powered Campaign Engine
- Integrates **Google Gemini** to auto-generate personalized campaign messages based on customer segments
- AI suggests optimal messaging tone and content for different audience groups

### ⚡ Asynchronous Job Processing
- Campaign sends are **never blocking** — every delivery is pushed to a **BullMQ queue**
- Separate **campaignWorker** and **schedulerWorker** processes handle delivery at scale
- Redis-backed queue ensures **zero message loss** with retry support

### 📊 Customer Segmentation
- Define dynamic audience segments using rule-based filters
- Target customers by behavior, spend history, activity, and more

### 🔴 Real-Time Delivery Tracking
- **Socket.io** streams live delivery receipts to the dashboard
- Track sent, delivered, and failed messages as they happen

### 🔐 Secure Authentication
- **JWT-based** stateless auth with token expiry
- Passwords hashed with **bcryptjs** (industry-standard salting)

### 📧 Multi-Channel Delivery
- Modular `channel-service` layer supports **Email** (Nodemailer), extensible for SMS/Push

---

## 🗂️ Project Structure


---

## 🛠️ Tech Stack Deep Dive

| Category | Technology | Why This Choice |
|---|---|---|
| **Framework** | Express v5 | Latest stable with async error handling built-in |
| **Database** | PostgreSQL + Prisma | Type-safe queries, migrations, relational integrity |
| **Queue** | BullMQ | Redis-backed, retry logic, delayed jobs, cron support |
| **Cache/Broker** | Redis (ioredis) | Fast in-memory broker for queues + caching |
| **AI** | Google Gemini | State-of-the-art LLM for content generation |
| **Auth** | JWT + bcryptjs | Stateless, scalable, industry-standard |
| **Real-time** | Socket.io | Bi-directional event streaming |
| **Email** | Nodemailer | Flexible SMTP-based email delivery |
| **HTTP Client** | Axios | Webhook callbacks & external API calls |

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- PostgreSQL (local or cloud)
- Redis (local or Upstash)
- Google Gemini API Key → [Get one here](https://ai.google.dev/)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/Somyaguptaece/xeno-crm-backend.git
cd xeno-crm-backend

# 2. Install dependencies
npm install

# 3. Configure environment variables
cp .env.example .env

# 4. Run database migrations
npx prisma migrate dev --name init

# 5. Generate Prisma client
npx prisma generate
```

### Environment Variables

```env
# ── Server ─────────────────────────────
PORT=5000

# ── Database ───────────────────────────
DATABASE_URL=postgresql://USER:PASSWORD@localhost:5432/xeno_crm

# ── Redis ──────────────────────────────
REDIS_HOST=127.0.0.1
REDIS_PORT=6379

# ── Authentication ──────────────────────
JWT_SECRET=your_super_secret_key
JWT_EXPIRES_IN=7d

# ── Google Gemini AI ───────────────────
GEMINI_API_KEY=your_gemini_api_key

# ── Email Delivery ─────────────────────
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
```

---

## ▶️ Running the Application

```bash
# Terminal 1 — Start the API server
npm start

# Terminal 2 — Start the campaign delivery worker
npm run worker

# Terminal 3 — Start the campaign scheduler
npm run scheduler
```

> 💡 In production, manage processes with **PM2** or **Docker Compose**.

---

## 📡 API Endpoints

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| `POST` | `/api/auth/register` | Register a new user | ❌ |
| `POST` | `/api/auth/login` | Login & get JWT token | ❌ |
| `GET` | `/api/customers` | List all customers | ✅ |
| `POST` | `/api/customers` | Add a new customer | ✅ |
| `GET` | `/api/segments` | List audience segments | ✅ |
| `POST` | `/api/segments` | Create a new segment | ✅ |
| `GET` | `/api/campaigns` | List all campaigns | ✅ |
| `POST` | `/api/campaigns` | Create & queue campaign | ✅ |
| `GET` | `/api/campaigns/:id/stats` | Campaign delivery stats | ✅ |

---

## 🔄 Campaign Lifecycle

---

## 🧩 Design Decisions

**Why separate workers?**
Keeping delivery workers as independent Node processes means the API server stays fast and responsive even under heavy campaign loads. Workers can be scaled horizontally without touching the API layer.

**Why BullMQ over simple setTimeout?**
BullMQ gives persistent jobs (survive restarts), automatic retries, rate limiting, cron scheduling — all backed by Redis.

**Why Prisma over raw SQL?**
Type-safe queries catch bugs at development time rather than production runtime. Migrations are version-controlled, and the schema serves as living documentation.

---

## 📈 Built to Scale

- ✅ **Stateless API** — horizontally scalable behind a load balancer
- ✅ **Decoupled workers** — scale delivery independently of the API
- ✅ **Redis queue** — jobs survive server restarts, no dropped campaigns
- ✅ **Modular channel-service** — add new delivery channels without changing core logic
- ✅ **Prisma migrations** — database changes are tracked and reproducible

---

## 👩‍💻 Author

**Somya Gupta**

[![GitHub](https://img.shields.io/badge/GitHub-Somyaguptaece-181717?style=flat-square&logo=github)](https://github.com/Somyaguptaece)

---

<div align="center">

*Built with ❤️ and a lot of async/await*

</div>
