import Router from "express";
import {
  registerFirstAdmin,
  registerEmployee,
  login,
  getCurrentUser,
} from "../controllers/auth.controller.js";

import { requireSuperAdmin, requireAdmins } from "../middlewares/admin.middleware.js";

const router = Router();

router.post("/register", registerFirstAdmin);
router.post("/admin/register", requireSuperAdmin, registerEmployee);
router.post("/login", login);
router.get("/user", requireAdmins, getCurrentUser);

export default router;

