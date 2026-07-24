import bcrypt from "bcryptjs";
import Admin from "../models/admin.model.js";
import jwt from "jsonwebtoken";
import { config } from "../config/config.js";

export const registerFirstAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if any user already exists
    const existingUser = await Admin.findOne();

    if (existingUser) {
      return res.status(403).json({
        success: false,
        message:
          "Initial registration is already completed. Ask an admin to create your account.",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create first user as SUPER_ADMIN
    const user = await Admin.create({
      name,
      email,
      password: hashedPassword,
      role: "SUPER_ADMIN",
    });

    return res.status(201).json({
      success: true,
      message: "Super admin created successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Error in registerFirstAdmin:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const registerEmployee = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const existingUser = await Admin.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "user already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await Admin.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    return res.status(201).json({
      success: true,
      message: "Create Employee Account successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Error in registerEmployee:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await Admin.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      config.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax",
      maxAge: 60 * 60 * 1000,
    });

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token, // Send token in response body as well
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Error in login:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
