import { Router } from "express";
import { TaskController } from "../controllers/task.controller";

const router = Router();

router.get("/", TaskController.listTasks);
router.post("/", TaskController.createTask);
router.patch("/:id", TaskController.updateTask);
router.delete("/:id", TaskController.deleteTask);

export default router;
