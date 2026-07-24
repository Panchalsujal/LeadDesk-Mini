import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import morgan from "morgan";
import AdminRouter from "./routers/admin.router.js";
import UserRouter from "./routers/user.router.js";
import LeadRouter from "./routers/lead.router.js";
const app = express();
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Welcome to the LeadDesk Mini API");
});

// Routes for Admin Authentication
app.use("/api/auth", AdminRouter);
app.use("/api/user", UserRouter);
app.use("/api/lead", LeadRouter);
export default app;
