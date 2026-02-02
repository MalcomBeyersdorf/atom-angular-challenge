import cors from "cors";
import express from "express";
import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

admin.initializeApp();

const app = express();
app.use(cors({ origin: true }));
app.use(express.json());

app.get("/health", (_, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

import taskRoutes from "./routes/task.routes";
import userRoutes from "./routes/user.routes";

// Routes
app.use("/users", userRoutes);
app.use("/tasks", taskRoutes);

export const api = functions.https.onRequest(app);
