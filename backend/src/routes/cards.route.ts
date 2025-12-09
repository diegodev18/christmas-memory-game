import { Router } from "express";

import { getCardById, getRandomCards } from "@/controllers/cards.controller";

const router = Router();

router.get("/random/:limit", getRandomCards);
router.get("/data/:id", getCardById);

export default router;
