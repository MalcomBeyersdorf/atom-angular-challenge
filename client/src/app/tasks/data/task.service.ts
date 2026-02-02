import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { AuthService } from '../../auth/data/auth.service';

export interface Task {
  id?: string;
  userEmail: string;
  title: string;
  description: string;
  isCompleted: boolean;
  createdAt: string; // ISO string from backend
}

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private http = inject(HttpClient);
  private authService = inject(AuthService);

  // State
  private tasksSignal = signal<Task[]>([]);
  readonly tasks = computed(() => this.tasksSignal());

  private apiUrl =
    'http://localhost:5001/atom-angular-challenge/us-central1/api/tasks';

  loadTasks() {
    const user = this.authService.user();
    if (!user) return;

    this.http.get<Task[]>(`${this.apiUrl}?email=${user.email}`).subscribe({
      next: (tasks) => this.tasksSignal.set(tasks),
      error: (err) => console.error('Error loading tasks', err),
    });
  }

  addTask(title: string, description: string) {
    const user = this.authService.user();
    if (!user) return;

    this.http
      .post<Task>(this.apiUrl, {
        userEmail: user.email,
        title,
        description,
      })
      .subscribe({
        next: (newTask) => {
          this.tasksSignal.update((tasks) => [newTask, ...tasks]);
        },
        error: (err) => console.error('Error adding task', err),
      });
  }

  toggleValid(task: Task) {
    // Optimistic update
    const updatedTask = { ...task, isCompleted: !task.isCompleted };
    this.tasksSignal.update((tasks) =>
      tasks.map((t) => (t.id === task.id ? updatedTask : t)),
    );

    this.http
      .patch(`${this.apiUrl}/${task.id}`, {
        isCompleted: updatedTask.isCompleted,
      })
      .subscribe({
        error: (err) => {
          console.error('Error updating task', err);
          // Revert on error
          this.tasksSignal.update((tasks) =>
            tasks.map((t) => (t.id === task.id ? task : t)),
          );
        },
      });
  }

  updateTask(taskId: string, title: string, description: string) {
    this.tasksSignal.update((tasks) =>
      tasks.map((t) => (t.id === taskId ? { ...t, title, description } : t)),
    );

    this.http
      .patch(`${this.apiUrl}/${taskId}`, { title, description })
      .subscribe({
        error: (err) => {
          console.error('Error updating task', err);
          // Revert logic could be complex here, reloading tasks is simpler for now
          this.loadTasks();
        },
      });
  }

  deleteTask(taskId: string) {
    this.tasksSignal.update((tasks) => tasks.filter((t) => t.id !== taskId));

    this.http.delete(`${this.apiUrl}/${taskId}`).subscribe({
      error: (err) => {
        console.error('Error deleting task', err);
        this.loadTasks();
      },
    });
  }
}
