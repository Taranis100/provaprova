// src/app/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { User } from './user.model';

interface Admin {
  id: number;
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000'; // Assicurati che questo sia corretto

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/utenti`);
  }

  login(username: string, password: string): Observable<Admin> {
    return this.http.post<Admin>(`${this.apiUrl}/login`, { username, password }).pipe(
      catchError(error => {
        console.error('Login failed', error);
        return throwError(() => new Error('Credenziali errate')); // Rilancia l'errore se il login fallisce
      })
    );
  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/utenti`, user);
  }

  updateUser(id: number, user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/utenti/${id}`, user);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/utenti/${id}`);
  }

  getUsersByAdmin(adminUsername: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/admins/${adminUsername}/utenti`);
  }

  getLoggedUser(): Observable<Admin> {
    return this.http.get<Admin>(`${this.apiUrl}/logged-admin`);
  }
}
