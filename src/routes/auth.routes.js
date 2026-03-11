import { Router } from "express";
import { validateBody } from "../middleware/validate.middleware.js";
import * as authController from "../controllers/auth.controller.js";

const router = Router();

router.post("/register", validateBody(["user_name", "user_email", "user_password"]), authController.register);
router.post("/login", validateBody(["user_email", "user_password"]), authController.login);

export default router;