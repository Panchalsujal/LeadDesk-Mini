import jwt from "jsonwebtoken";
import Admin from "../models/admin.model.js";
import { config } from "../config/config.js";

export const requireSuperAdmin = async (req, res, next) => {
  try {
    // Get JWT token from HTTP-only cookie
    const token = req.cookies.token;

    console.log(token);

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    // Verify JWT
    const decoded = jwt.verify(token, config.JWT_SECRET);

    console.log(decoded);

    // Find logged-in admin
    const user = await Admin.findById(decoded.id).select("-password");

    console.log(user);
    // Attach logged-in admin to request
    req.user = user;

    // Only SUPER_ADMIN can create employee accounts
    if (req.user.role !== "SUPER_ADMIN") {
      return res.status(403).json({
        success: false,
        message: "Only SUPER_ADMIN can create employee accounts",
      });
    }

    next();
  } catch (error) {
    console.error("Auth middleware error:", error);

    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

export const requireAdmins = async (req, res, next) => {
  try {
    // Get JWT token from HTTP-only cookie
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    // Verify JWT
    const decoded = jwt.verify(token, config.JWT_SECRET);

    // Find logged-in admin
    const user = await Admin.findById(decoded.id).select("-password");

    // Attach logged-in admin to request
    req.user = user;

    console.log(req.user);

    // Only SUPER_ADMIN can create employee accounts
     // Allowed roles
    const allowedRoles = [
      "SUPER_ADMIN",
      "ADMIN",
      "EMPLOYEE",
      "MANAGER",
    ];

    // Reject unauthorized roles
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: "You do not have permission to access this route",
      });
    }

    next();
  } catch (error) {
    console.error("Auth middleware error:", error);

    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};
