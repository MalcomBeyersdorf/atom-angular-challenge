import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { AuthService } from '../data/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  template: `
    <div class="login-container">
      <mat-card>
        <mat-card-header>
          <mat-card-title>Login</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <form (ngSubmit)="onSubmit()" #loginForm="ngForm">
            <mat-form-field appearance="outline" class="w-100">
              <mat-label>Email</mat-label>
              <input matInput [(ngModel)]="email" name="email" required email />
            </mat-form-field>
          </form>
          <div *ngIf="showConfirm" class="confirm-dialog">
            <p>User does not exist. Create new account?</p>
            <button mat-raised-button color="primary" (click)="createUser()">
              Create
            </button>
            <button mat-button (click)="showConfirm = false">Cancel</button>
          </div>
        </mat-card-content>
        <mat-card-actions *ngIf="!showConfirm">
          <button
            mat-raised-button
            color="primary"
            (click)="onSubmit()"
            [disabled]="!email"
          >
            Next
          </button>
        </mat-card-actions>
      </mat-card>
    </div>
  `,
  styles: [
    `
      .login-container {
        gap: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        background-color: #f5f5f5;
      }
      mat-card {
        width: 400px;
        padding: 20px;
      }
      .w-100 {
        width: 100%;
      }
      .confirm-dialog {
        margin-top: 20px;
        text-align: center;
        p {
          margin-bottom: 15px;
        }
        button {
          margin: 0 5px;
        }
      }
    `,
  ],
})
export class LoginComponent {
  authService = inject(AuthService);
  router = inject(Router);

  email = '';
  showConfirm = false;

  onSubmit() {
    if (!this.email) return;

    this.authService.checkUser(this.email).subscribe((user) => {
      if (user) {
        this.router.navigate(['/tasks']);
      } else {
        this.showConfirm = true;
      }
    });
  }

  createUser() {
    this.authService.createUser(this.email).subscribe((user) => {
      if (user) {
        this.router.navigate(['/tasks']);
      }
    });
  }
}
