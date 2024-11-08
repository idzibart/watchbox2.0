import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoute from "./routes/auth.route.js";
import omdbRoute from "./routes/omdb.route.js";
import rateRoute from "./routes/rate.route.js";

dotenv.config();
const app = express();

// MIDDLEWARE
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(cookieParser());

//ROUTES
app.use("/api/auth", authRoute);
app.use("/api/omdb", omdbRoute);
app.use("/api/rate", rateRoute);

//PORT
const PORT = process.env.PORT || 2137;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
