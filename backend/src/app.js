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


const corsOptions = {
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "Accept"],
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
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
