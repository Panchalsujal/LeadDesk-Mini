import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import morgan from "morgan";
import AdminRouter from "./routers/admin.router.js";
import UserRouter from "./routers/user.router.js";
import LeadRouter from "./routers/lead.router.js";
import { generalRateLimiter } from "./ratelimitation/user.rate.js";
const app = express();
app.use(
  cors({
    origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
app.get("/", (req, res) => {
  res.send("Welcome to the LeadDesk Mini API");
});

// Routes for Admin Authentication
app.use("/api/auth", generalRateLimiter, AdminRouter);
app.use("/api/user", UserRouter);
app.use("/api/lead", generalRateLimiter, LeadRouter);
export default app;
