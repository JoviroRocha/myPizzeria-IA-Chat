import { Router } from "express";
import { postMessage, getMessages } from "./controllers/messageController.js";

const router = Router();
router.post("/messages", postMessage);
router.get("/messages", getMessages);

export default router;
