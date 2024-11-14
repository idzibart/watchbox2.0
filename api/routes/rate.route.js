import express from "express";
import { rateMovie, getRating, getRatedMovies } from "../controllers/rate.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/movie", verifyToken, rateMovie);
router.get("/movie/:imdbID", verifyToken, getRating);
router.get("/movies", verifyToken, getRatedMovies);

export default router;
