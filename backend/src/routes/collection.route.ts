import { Router } from "express";

import {
  getCollectionItems,
  newCollectionItem,
} from "@/controllers/collection.controller";

const router = Router();

router.get("/items", getCollectionItems);
router.post("/new", newCollectionItem);

export default router;
