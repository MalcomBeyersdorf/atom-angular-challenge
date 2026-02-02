import { Request, Response } from "express";
import { TaskRepository } from "../repositories/task.repository";
import { TaskService } from "../services/task.service";

const taskService = new TaskService(new TaskRepository());

export class TaskController {
  static async listTasks(req: Request, res: Response) {
    try {
      const { email } = req.query;
      if (!email || typeof email !== "string") {
        res.status(400).json({ error: "Email query parameter is required" });
        return;
      }
      const tasks = await taskService.getTasks(email);
      res.json(tasks);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  static async createTask(req: Request, res: Response) {
    try {
      const { userEmail, title, description } = req.body;
      if (!userEmail || !title) {
        res.status(400).json({ error: "User Email and Title are required" });
        return;
      }
      const task = await taskService.addTask(
        userEmail,
        title,
        description || "",
      );
      res.status(201).json(task);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  static async updateTask(req: Request, res: Response) {
    try {
      const id = req.params.id as string;
      const updates = req.body;
      await taskService.updateTask(id, updates);
      res.status(204).send();
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  static async deleteTask(req: Request, res: Response) {
    try {
      const id = req.params.id as string;
      await taskService.deleteTask(id);
      res.status(204).send();
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}
