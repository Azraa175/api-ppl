import dotenv from "dotenv";
dotenv.config();

import cors from "cors";
import cookieParser from "cookie-parser";
import express from "express";
import passport from "./config/passport";

import { requestLogger } from "./middlewares/logger";

import userRoute from "./routes/userRoute";
import authRoute from "./routes/authRoute";

const app = express();

// Body parser
app.use(express.json());

app.use(requestLogger);

// CORS
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

// Cookie parser
app.use(cookieParser());

// Passport
app.use(passport.initialize());

app.get("/", (req, res) => {
  res.json({
    status: 200,
    message: "Welcome Server API",
    success: true
  })
})


// ROUTES
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);

// Public upload folder
app.use("/uploads", express.static("public/uploads"));


export default app;
