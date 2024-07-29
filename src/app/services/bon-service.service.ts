import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Bon } from '../models/bon.models';


@Injectable({
  providedIn: 'root'
})
export class BonService {
  private apiUrl = 'http://localhost:8080/admin'; 

  constructor(private http: HttpClient) { }

  getAllBons(): Observable<Bon[]> {
    return this.http.get<Bon[]>(this.apiUrl);
  }

  getBonById(id: number): Observable<Bon> {
    return this.http.get<Bon>(`${this.apiUrl}/${id}`);
  }

  createBon(bon: Bon): Observable<Bon> {
    return this.http.post<Bon>(this.apiUrl, bon);
  }

  deleteBon(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}