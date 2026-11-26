
import { Router } from "express";

import { authenticate } from "../../middleware/auth.middleware";
import { getMeController } from "./users.controller";

const router = Router();

// Only authenticated users can access this endpoint
router.get("/me", authenticate, getMeController);

export default router;
