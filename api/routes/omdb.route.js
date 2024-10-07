import express from "express";
import { movieInfo, searchMovie } from "../controllers/omdb.controller.js";

const router = express.Router();

router.get("/search", searchMovie);
router.get("/movie/:imdbID", movieInfo);

export default router;
