import { Task } from "../models/types";
import { TaskRepository } from "../repositories/task.repository";

export class TaskService {
  constructor(private taskRepository: TaskRepository) {}

  async getTasks(userEmail: string): Promise<Task[]> {
    return this.taskRepository.findAllByUser(userEmail);
  }

  async addTask(
    userEmail: string,
    title: string,
    description: string,
  ): Promise<Task> {
    const task: Task = {
      userEmail,
      title,
      description,
      isCompleted: false,
      createdAt: new Date(),
    };
    return this.taskRepository.create(task);
  }

  async updateTask(taskId: string, updates: Partial<Task>): Promise<void> {
    // Ideally we should check if task exists and belongs to user
    await this.taskRepository.update(taskId, updates);
  }

  async deleteTask(taskId: string): Promise<void> {
    await this.taskRepository.delete(taskId);
  }
}
