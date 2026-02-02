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
    <mat-dialog-content>
      <mat-form-field appearance="outline" class="w-100">
        <mat-label>Title</mat-label>
        <input matInput [(ngModel)]="localTitle" required />
      </mat-form-field>
      <mat-form-field appearance="outline" class="w-100">
        <mat-label>Description</mat-label>
        <textarea matInput [(ngModel)]="localDesc"></textarea>
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
          <span>{{ authService.user()?.email }}</span>
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
          *ngFor="let task of taskService.tasks()"
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
                <p>{{ task.description }}</p>
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
          <p>No tasks found. Create one to get started!</p>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .tasks-container {
        max-width: 800px;
        margin: 0 auto;
        padding: 20px;
      }
      .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
      }
      .add-task-btn {
        margin-bottom: 20px;
        text-align: right;
      }
      .task-card {
        margin-bottom: 10px;
        &.completed {
          background-color: #f9f9f9;
          opacity: 0.8;
        }
      }
      .task-header {
        display: flex;
        align-items: flex-start;
        gap: 15px;
      }
      .task-info {
        flex: 1;
        h3 {
          margin: 0 0 5px 0;
        }
        p {
          margin: 0 0 5px 0;
          color: #666;
        }
        .date {
          font-size: 12px;
          color: #999;
        }
        .strike {
          text-decoration: line-through;
        }
      }
      .task-actions {
        display: flex;
      }
      .empty-state {
        text-align: center;
        padding: 40px;
        color: #999;
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
