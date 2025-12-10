import { Router } from "express";

import { submitScore } from "@/controllers/score.controller";

const router = Router();

router.post("/submit", submitScore);

export default router;
