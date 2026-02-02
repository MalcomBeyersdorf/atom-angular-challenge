"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskController = void 0;
const task_service_1 = require("../services/task.service");
const task_repository_1 = require("../repositories/task.repository");
const taskService = new task_service_1.TaskService(new task_repository_1.TaskRepository());
class TaskController {
    static async listTasks(req, res) {
        try {
            const { email } = req.query;
            if (!email || typeof email !== 'string') {
                res.status(400).json({ error: 'Email query parameter is required' });
                return;
            }
            const tasks = await taskService.getTasks(email);
            res.json(tasks);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    static async createTask(req, res) {
        try {
            const { userEmail, title, description } = req.body;
            if (!userEmail || !title) {
                res.status(400).json({ error: 'User Email and Title are required' });
                return;
            }
            const task = await taskService.addTask(userEmail, title, description || '');
            res.status(201).json(task);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    static async updateTask(req, res) {
        try {
            const id = req.params.id;
            const updates = req.body;
            await taskService.updateTask(id, updates);
            res.status(204).send();
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    static async deleteTask(req, res) {
        try {
            const id = req.params.id;
            await taskService.deleteTask(id);
            res.status(204).send();
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}
exports.TaskController = TaskController;
