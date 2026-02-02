"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskService = void 0;
class TaskService {
    taskRepository;
    constructor(taskRepository) {
        this.taskRepository = taskRepository;
    }
    async getTasks(userEmail) {
        return this.taskRepository.findAllByUser(userEmail);
    }
    async addTask(userEmail, title, description) {
        const task = {
            userEmail,
            title,
            description,
            isCompleted: false,
            createdAt: new Date()
        };
        return this.taskRepository.create(task);
    }
    async updateTask(taskId, updates) {
        // Ideally we should check if task exists and belongs to user
        await this.taskRepository.update(taskId, updates);
    }
    async deleteTask(taskId) {
        await this.taskRepository.delete(taskId);
    }
}
exports.TaskService = TaskService;
