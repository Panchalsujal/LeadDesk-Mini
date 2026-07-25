import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import morgan from "morgan";
import AdminRouter from "./routers/admin.router.js";
import UserRouter from "./routers/user.router.js";
import LeadRouter from "./routers/lead.router.js";
import { generalRateLimiter } from "./ratelimitation/user.rate.js";

const app = express();

// Trust proxy for Vercel/reverse proxies so express-rate-limit works properly
app.set("trust proxy", 1);


const allowedOrigins = [
  "https://leaddesk-mini-3.onrender.com",
  "https://lead-desk-mini-virid.vercel.app",
  "https://lead-desk-mini-gold.vercel.app",
  "http://localhost:5173",
  "http://localhost:3000",
  "http://127.0.0.1:5173",
];

const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps, Postman, curl, or server-to-server)
    if (!origin) return callback(null, true);

    const sanitizedOrigin = origin.replace(/\/$/, "");

    if (
      allowedOrigins.includes(sanitizedOrigin) ||
      sanitizedOrigin.endsWith(".vercel.app") ||
      sanitizedOrigin.endsWith(".onrender.com") ||
      sanitizedOrigin.startsWith("http://localhost:") ||
      sanitizedOrigin.startsWith("http://127.0.0.1:")
    ) {
      return callback(null, true);
    }

    return callback(null, true);
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "Accept"],
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

// Explicit fallback middleware to ensure CORS headers are present on all responses, including errors & OPTIONS preflights
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (origin) {
    const sanitized = origin.replace(/\/$/, "");
    res.setHeader("Access-Control-Allow-Origin", sanitized);
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, PATCH");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With, Accept");
  }
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }
  next();
});

app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to the Lead Desk API",
  });
});

// Routes for Admin Authentication
app.use("/api/auth", generalRateLimiter, AdminRouter);
app.use("/api/user", UserRouter);
app.use("/api/lead", generalRateLimiter, LeadRouter);

export default app;
