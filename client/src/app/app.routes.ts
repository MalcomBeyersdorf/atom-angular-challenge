import { inject } from '@angular/core';
import { Router, Routes } from '@angular/router';
import { AuthService } from './auth/data/auth.service';
import { LoginComponent } from './auth/feature/login.component';
import { TasksListComponent } from './tasks/feature/tasks-list.component';

// Simple Guard
const authGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.user()) {
    return true;
  }
  return router.navigate(['/login']);
};

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'tasks',
    component: TasksListComponent,
    canActivate: [authGuard],
  },
];
