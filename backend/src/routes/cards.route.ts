import { Router } from "express";

import { getRandomCards } from "@/controllers/cards.controller";

const router = Router();

router.get("/random/:limit", getRandomCards);

export default router;
