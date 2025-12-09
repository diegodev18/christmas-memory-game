import { Router } from "express";

import { newCollectionItem } from "@/controllers/collection.controller";

const router = Router();

router.post("/new", newCollectionItem);
export default router;
