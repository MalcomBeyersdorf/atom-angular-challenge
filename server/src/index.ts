import cors from "cors";
import express from "express";
import * as admin from "firebase-admin";

const port = process.env.port || 3000;

var serviceAccount = require("../atom-angular-challenge-firebase-adminsdk.json");

export const firebase = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
