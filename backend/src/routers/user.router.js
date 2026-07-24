import Router from "express";
import { userController } from "../controllers/user.controller.js";
import { validateLead } from "../validation/user.validation.js";
import { leadRateLimiter } from "../ratelimitation/user.rate.js";
const router = Router();
router.post("/connect", leadRateLimiter, validateLead, userController);

export default router;
