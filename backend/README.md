# ⚙️ LeadDesk Backend — REST API

The backend for **LeadDesk** is an Express.js REST API powered by **Node.js** and **MongoDB**. It handles user authentication, role-based authorization, and lead management.

---

## 🔑 Test Demo Credentials

Use these credentials to test admin API endpoints:

- **Email:** `test@gmail.com`
- **Password:** `Test@123`

---

## 🚀 Tech Stack

- **Runtime:** Node.js (ES Modules)
- **Framework:** Express.js 5
- **Database:** MongoDB + Mongoose 9
- **Authentication:** JSON Web Tokens (JWT) + HTTP-only cookies
- **Security:** bcryptjs, CORS, Express Rate Limit, Express Validator
- **Logging:** Morgan

---

## ⚙️ Environment Variables

Create a `.env` file in the `backend` folder:

```env
PORT=3000
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/leaddesk
JWT_SECRET=your_jwt_secret_key_here
```

---

## 📡 API Endpoints

### 1. Lead Management
- `POST /api/user/connect` — Public endpoint to submit a lead form.
- `GET /api/lead/get-leads` — Authenticated endpoint to retrieve all leads.
- `PATCH /api/lead/update-lead/:id` — Authenticated endpoint to update lead status (`NEW`, `CONTACTED`, `CLOSED`).

### 2. Authentication & Admin
- `POST /api/auth/login` — Sign in user & receive JWT token.
- `POST /api/auth/register` — Initial setup endpoint to register Super Admin (runs once).
- `POST /api/auth/admin/register` — Super Admin endpoint to create employee/admin accounts.
- `GET /api/auth/user` — Get current logged-in user profile details.

---

## 💻 Commands

```bash
# Install dependencies
npm install

# Run in development mode
npm run dev

# Run in production mode
npm start
```

---

## 📄 License

ISC License.
