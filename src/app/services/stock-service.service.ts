import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Stock } from '../models/stock.models';

@Injectable({
  providedIn: 'root'
})
export class StockService {
  private apiUrl = 'http://localhost:8080/admin';

  constructor(private http: HttpClient) { }

  getCurrentUserStock(): Observable<Stock> {
    return this.http.get<Stock>(`${this.apiUrl}/currentStock`);
  }
}