import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogModule,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../../auth/data/auth.service';
import { Task, TaskService } from '../data/task.service';

@Component({
  selector: 'app-task-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
  ],
  template: `
    <h2 mat-dialog-title>{{ data.task ? 'Edit Task' : 'New Task' }}</h2>
    <br />
    <mat-dialog-content>
      <mat-form-field appearance="outline" class="w-100">
        <mat-label>Title</mat-label>
        <input matInput [(ngModel)]="localTitle" required />
      </mat-form-field>
      <mat-form-field appearance="outline" class="w-100">
        <mat-label>Description</mat-label>
        <textarea matInput [(ngModel)]="localDesc" rows="3"></textarea>
      </mat-form-field>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button [mat-dialog-close]="null">Cancel</button>
      <button
        mat-raised-button
        color="primary"
        [mat-dialog-close]="{ title: localTitle, description: localDesc }"
        [disabled]="!localTitle"
      >
        Save
      </button>
    </mat-dialog-actions>
  `,
  styles: ['.w-100 { width: 100%; }'],
})
export class TaskDialogComponent {
  data = inject<any>(MAT_DIALOG_DATA);
  localTitle = this.data.task?.title || '';
  localDesc = this.data.task?.description || '';
}

@Component({
  selector: 'app-tasks-list',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
    MatDialogModule,
  ],
  template: `
    <div class="tasks-container">
      <div class="header">
        <h1>My Tasks</h1>
        <div class="actions">
          <span class="user-email">{{ authService.user()?.email }}</span>
          <button mat-icon-button (click)="authService.logout()" title="Logout">
            <mat-icon>logout</mat-icon>
          </button>
        </div>
      </div>

      <div class="add-task-btn">
        <button mat-raised-button color="primary" (click)="openTaskDialog()">
          <mat-icon>add</mat-icon> Add Task
        </button>
      </div>

      <div class="task-list">
        <mat-card
          *ngFor="let task of taskService.tasks(); trackBy: trackByTask"
          class="task-card"
          [class.completed]="task.isCompleted"
        >
          <mat-card-content>
            <div class="task-header">
              <mat-checkbox
                [checked]="task.isCompleted"
                (change)="taskService.toggleValid(task)"
                color="primary"
              ></mat-checkbox>
              <div class="task-info">
                <h3 [class.strike]="task.isCompleted">{{ task.title }}</h3>
                <p *ngIf="task.description">{{ task.description }}</p>
                <small class="date">{{
                  task.createdAt | date: 'medium'
                }}</small>
              </div>
              <div class="task-actions">
                <button mat-icon-button (click)="openTaskDialog(task)">
                  <mat-icon>edit</mat-icon>
                </button>
                <button
                  mat-icon-button
                  color="warn"
                  (click)="taskService.deleteTask(task.id!)"
                >
                  <mat-icon>delete</mat-icon>
                </button>
              </div>
            </div>
          </mat-card-content>
        </mat-card>

        <div *ngIf="taskService.tasks().length === 0" class="empty-state">
          <mat-icon>assignment</mat-icon>
          <p>No tasks found. Create one to get started!</p>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .tasks-container {
        max-width: 900px;
        margin: 0 auto;
        padding: 24px;
        min-height: 100vh;
        background-color: #f5f5f5;
      }

      .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 24px;
        background: white;
        padding: 20px 24px;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }

      .header h1 {
        margin: 0;
        font-size: 28px;
        font-weight: 500;
        color: #333;
      }

      .actions {
        display: flex;
        align-items: center;
        gap: 12px;
      }

      .user-email {
        font-size: 14px;
        color: #666;
      }

      .add-task-btn {
        margin-bottom: 16px;
        text-align: right;
      }

      .task-list {
        display: flex;
        flex-direction: column;
        gap: 12px;
      }

      .task-card {
        transition: all 0.2s ease;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);

        &:hover {
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.12);
        }

        &.completed {
          background-color: #fafafa;
          opacity: 0.7;
        }
      }

      .task-header {
        display: flex;
        align-items: flex-start;
        gap: 16px;
      }

      .task-info {
        flex: 1;
        min-width: 0;

        h3 {
          margin: 0 0 8px 0;
          font-size: 18px;
          font-weight: 500;
          color: #333;
          word-wrap: break-word;

          &.strike {
            text-decoration: line-through;
            color: #999;
          }
        }

        p {
          margin: 0 0 8px 0;
          color: #666;
          font-size: 14px;
          line-height: 1.5;
          word-wrap: break-word;
        }

        .date {
          font-size: 12px;
          color: #999;
        }
      }

      .task-actions {
        display: flex;
        gap: 4px;
        flex-shrink: 0;
      }

      .empty-state {
        text-align: center;
        padding: 60px 40px;
        background: white;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);

        mat-icon {
          font-size: 64px;
          width: 64px;
          height: 64px;
          color: #ccc;
          margin-bottom: 16px;
        }

        p {
          margin: 0;
          color: #999;
          font-size: 16px;
        }
      }
    `,
  ],
})
export class TasksListComponent implements OnInit {
  taskService = inject(TaskService);
  authService = inject(AuthService);
  dialog = inject(MatDialog);

  ngOnInit() {
    this.taskService.loadTasks();
  }

  trackByTask = (_: number, task: Task): string => {
    return task.id!;
  };

  openTaskDialog(task?: Task) {
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '400px',
      data: { task },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (task) {
          this.taskService.updateTask(
            task.id!,
            result.title,
            result.description,
          );
        } else {
          this.taskService.addTask(result.title, result.description);
        }
      }
    });
  }
}
