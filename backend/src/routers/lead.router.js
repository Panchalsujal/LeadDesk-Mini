import { Router } from "express";
import { requireAdmins } from "../middlewares/admin.middleware.js";
import { leadController } from "../controllers/lead.controller.js";
const router = Router();

router.get("/get-leads", requireAdmins, leadController);

export default router;
