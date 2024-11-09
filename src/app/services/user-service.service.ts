import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import { User } from '../models/user.models';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl: String = 'http://localhost:8080/admin'
  constructor(private http: HttpClient) {}
  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/users`);
  }

  // Récupérer un utilisateur par son ID
  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/user/${id}`);
  }

  // Ajouter un nouvel utilisateur
  addUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/add-user`, user);
  }

  // Supprimer un utilisateur
  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete-user/${id}`);
  }

  // Modifier un utilisateur
  updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.baseUrl}/update-user/${user.id}`, user);
  }
  getUserByEmail(email: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/search?email=${email}`);
  }

  getUserCount() {
    return this.http.get<number>(`${this.baseUrl}/users/count`);
  }
  getProfile() {
    return this.http.get(this.baseUrl + `current`);
  }
}