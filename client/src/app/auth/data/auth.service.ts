import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, of, tap } from 'rxjs';
import { environment } from '../../../environments/environment';

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

  private apiUrl = environment.apiUrl;

  checkUser(email: string): Observable<User | null> {
    return this.http.get<User | null>(`${this.apiUrl}/users/${email}`).pipe(
      tap((user) => this.currUser.set(user)),
      catchError(() => of(null)),
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
