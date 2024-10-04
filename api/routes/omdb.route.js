import express from "express";
import { searchMovie } from "../controllers/omdb.controller.js";

const router = express.Router();

router.get("/search", searchMovie);

export default router;
