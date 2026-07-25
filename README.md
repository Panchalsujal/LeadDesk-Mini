# ⚡ LeadDesk — Modern Premium SaaS CRM

LeadDesk is a high-performance, modern SaaS CRM platform built for agencies and growing sales teams to capture, track, and close leads seamlessly. Designed with design aesthetics inspired by **Linear**, **Stripe**, **Vercel**, **Flowbite**, **Tailwind UI**, **Preline**, and **Shadcn UI**.

---

## 🔑 Test Credentials

Use these credentials to sign in directly to the Admin Dashboard:

| Role | Email | Password |
|---|---|---|
| **Super Admin / Admin** | `test@gmail.com` | `Test@123` |

---

## ✨ Features & Architecture

### 🎨 Frontend (React + Vite + Tailwind CSS)
- **Design System:** White background, Indigo primary theme (`#4f46e5`), Inter font, soft shadows, rounded-xl cards, and smooth micro-animations.
- **Landing Page:** Sticky navigation, high-converting hero section with dashboard mockup preview, 6-card feature grid, why-choose-us metrics, testimonials grid, interactive FAQ accordion, lead capture contact form, and footer.
- **Admin Dashboard:** Real-time KPI summary cards, Recharts Bar Chart (leads over time), Recharts Donut Chart (status breakdown), and recent leads table.
- **Leads Management:** Full data table, real-time search, status filter tabs (`All`, `NEW`, `CONTACTED`, `CLOSED`), sorting options, expandable full message viewer, and pagination (10 leads/page).
- **Create Admin Page:** Role selector cards (`Employee`, `Manager`, `Admin`), password strength meter, and access control overview.
- **Profile Page:** Update profile details (Name, Email) and change password with validation.
- **Global State Management:** Redux Toolkit (`leadsSlice`) for centralized leads management.
- **Mobile Responsive:** 100% responsive across mobile, tablet, and desktop with a mobile drawer sidebar.

### 🛡️ Backend (Node.js + Express + MongoDB)
- **Authentication & Security:** JWT authentication tokens, bcrypt password hashing, and role-based authorization (`SUPER_ADMIN`, `ADMIN`, `MANAGER`, `EMPLOYEE`).
- **REST APIs:** Structured endpoints for authentication, lead submission, lead management, and employee account creation.
- **Database:** MongoDB with Mongoose schemas for users and leads.

---

## 🚀 Quick Start Guide

### 1. Prerequisites
- **Node.js:** `v18.0.0` or higher
- **npm:** `v9.0.0` or higher
- **MongoDB:** Local instance or MongoDB Atlas connection URI

---

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside `backend/`:
```env
PORT=3000
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/leaddesk
JWT_SECRET=your_jwt_secret_key_here
```

Start the backend server:
```bash
# Development mode
npm run dev

# Production mode
npm start
```
The server will run on `http://localhost:3000`.

---

### 3. Frontend Setup

```bash
cd frontend
npm install
```

Start the Vite development server:
```bash
npm run dev
```
Open `http://localhost:5173` in your browser.

To build for production:
```bash
npm run build
```

---

## 📂 Project Structure

```
LeadDesk Mini/
├── backend/                  # Node.js & Express REST API
│   ├── src/
│   │   ├── config/           # Database configuration
│   │   ├── controllers/      # Route controllers (auth, lead)
│   │   ├── middleware/       # JWT auth & error middleware
│   │   ├── models/           # Mongoose schemas (User, Lead)
│   │   ├── routes/           # API router endpoints
│   │   └── app.js            # Express application setup
│   ├── server.js             # Entry point
│   ├── package.json
│   └── README.md
│
├── frontend/                 # React + Vite + Tailwind CSS UI
│   ├── src/
│   │   ├── components/       # UI components (Badge, Avatar, KpiCard, etc.)
│   │   │   └── charts/       # Recharts bar and donut charts
│   │   ├── contexts/         # AuthContext
│   │   ├── hooks/            # Custom hooks (useLeads, useLogin, etc.)
│   │   ├── layouts/          # AdminLayout with responsive sidebar & topbar
│   │   ├── pages/            # Landing, Login, Register, Dashboard, Leads, Profile, CreateAdmin
│   │   ├── services/         # Axios API service calls
│   │   ├── store/            # Redux Toolkit store & leadsSlice
│   │   ├── App.jsx           # Main router setup
│   │   ├── index.css         # White & Indigo design system
│   │   └── main.jsx          # Entry point with Redux Provider
│   ├── package.json
│   ├── vite.config.js
│   └── README.md
│
└── README.md                 # Project root documentation
```

---

## 🛠️ API Reference

| Method | Endpoint | Access | Description |
|---|---|---|---|
| `POST` | `/api/user/connect` | Public | Submit new lead form |
| `POST` | `/api/auth/login` | Public | Sign in user & return JWT |
| `POST` | `/api/auth/register` | Public | Register initial Super Admin |
| `POST` | `/api/auth/admin/register` | Super Admin | Create new employee/admin account |
| `GET` | `/api/lead/get-leads` | Authenticated | Fetch all captured leads |
| `PATCH` | `/api/lead/update-lead/:id` | Authenticated | Update lead status (`NEW`, `CONTACTED`, `CLOSED`) |

---

## 🔑 Test Demo Credentials Summary

- **Email:** `test@gmail.com`
- **Password:** `Test@123`

---

© 2026 LeadDesk. All rights reserved.
