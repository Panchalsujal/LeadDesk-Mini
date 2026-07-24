import app from "./backend/src/app.js";
import connectDB from "./backend/src/config/db.js";

let isConnected = false;

export default async function handler(req, res) {
  if (!isConnected) {
    try {
      await connectDB();
      isConnected = true;
    } catch (error) {
      console.error("MongoDB connection error:", error);
    }
  }
  return app(req, res);
}
