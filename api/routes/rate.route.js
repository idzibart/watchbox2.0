import express from "express";
import { rateMovie, getRating } from "../controllers/rate.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/movie", verifyToken, rateMovie);
router.get("/movie/:imdbID", verifyToken, getRating);

export default router;
