import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, map, of, tap } from 'rxjs';

export interface User {
  email: string;
  createdAt: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private readonly currUser = signal<User | null>(null);

  readonly user = computed(() => this.currUser());

  // Base URL should be environment based but hardcoding for now as per simple setup
  private apiUrl =
    'http://localhost:5001/atom-angular-challenge/us-central1/api';
  // NOTE: User needs to replace project-id/region if different. I'll make this generic or ask user to check.

  checkUser(email: string): Observable<boolean> {
    return this.http
      .get<{ exists: boolean; user: User }>(`${this.apiUrl}/users/${email}`)
      .pipe(
        map((res) => {
          if (res.exists) {
            this.currUser.set(res.user);
            return true;
          }
          return false;
        }),
        catchError(() => of(false)),
      );
  }

  createUser(email: string): Observable<User | null> {
    return this.http.post<User>(`${this.apiUrl}/users`, { email }).pipe(
      tap((user) => this.currUser.set(user)),
      catchError((err) => {
        console.error(err);
        return of(null);
      }),
    );
  }

  logout() {
    this.currUser.set(null);
    this.router.navigate(['/login']);
  }
}
