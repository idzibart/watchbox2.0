import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import omdbRoute from "./routes/omdb.route.js";

dotenv.config();
const app = express();

// MIDDLEWARE
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());

//ROUTES
app.use("/api/omdb", omdbRoute);

//PORT
const PORT = process.env.PORT || 2137;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
