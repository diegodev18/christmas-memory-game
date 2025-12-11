import { Router } from "express";

import { getTopScores, submitScore } from "@/controllers/score.controller";

const router = Router();

router.get("/top/:limit", getTopScores);
router.post("/submit", submitScore);

export default router;
