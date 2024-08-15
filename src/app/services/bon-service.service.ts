import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Bon } from '../models/bon.models';
import { Transaction } from '../models/transaction.models';


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

 /* createBon(bon: Bon): Observable<Bon> {
    return this.http.post<Bon>(this.apiUrl, bon);
  }
*/
  deleteBon(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  createBonLivraison(bonLivraison: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/bons/livraison`, bonLivraison);
  }
/******************* */
  generateQRCode(bonId: number): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/${bonId}/qrcode`, { responseType: 'blob' });
  }

  createBon(receiverEmail: string, transactions: Transaction[]): Observable<any> {
    return this.http.post(`${this.apiUrl}/create`, { receiverEmail, transactions});
  }

  checkBonStatus(bonId: number): Observable<string> {
    return this.http.get<string>(`${this.apiUrl}/${bonId}/status`);
  }

  finalizeBon(bonId: number, isFacture: boolean): Observable<any> {
    return this.http.post(`${this.apiUrl}/${bonId}/finalize`, { isFacture });
  }
}