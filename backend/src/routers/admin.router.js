import Router from "express";
import { registerFirstAdmin, registerEmployee, login
} from "../controllers/auth.controller.js";

import { requireSuperAdmin } from "../middlewares/admin.middleware.js";
const router = Router();

router.post("/register", registerFirstAdmin);
router.post("/admin/register",requireSuperAdmin, registerEmployee);
router.post("/login", login);


export default router;
