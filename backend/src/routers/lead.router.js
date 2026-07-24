import { Router } from "express";
import { requireAdmins } from "../middlewares/admin.middleware.js";
import { leadController ,statusUpdateController} from "../controllers/lead.controller.js";
const router = Router();

router.get("/get-leads", requireAdmins, leadController);
router.patch("/update-lead/:id", requireAdmins, statusUpdateController);


export default router;
