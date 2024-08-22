import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Facture } from '../models/facture.models';


@Injectable({
  providedIn: 'root'
})
export class FactureService {
    private apiUrl = 'http://localhost:8080/admin'; // Replace with your backend URL

  constructor(private http: HttpClient) {}

  getFactures(): Observable<Facture[]> {
    return this.http.get<Facture[]>(`${this.apiUrl}/factures`);
  }
}