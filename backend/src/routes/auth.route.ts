import { Router } from "express";

const router = Router();

router.get("/session");
router.post("/register");
router.post("/login");
router.post("/logout");
