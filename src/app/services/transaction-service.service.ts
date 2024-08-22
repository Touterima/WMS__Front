import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Transaction } from '../models/transaction.models';
import { User } from '../models/user.models';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private apiUrl = 'http://localhost:8080/admin'; 

  constructor(private http: HttpClient) { }

  getAllTransactions(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(`${this.apiUrl}/transaction-list`);
  }

  getTransactionById(id: number): Observable<Transaction> {
    return this.http.get<Transaction>(`${this.apiUrl}/${id}`);
  }

  createTransaction(transaction: Transaction): Observable<Transaction> {
    return this.http.post<Transaction>(`${this.apiUrl}/add-transaction`, transaction);
  }


  deleteTransaction(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getAllTransactionsByUser(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(`${this.apiUrl}/getAllByUser`);
  }

  

    createBonLivraison(receiverEmail: string): Observable<any> {
      const url = `${this.apiUrl}/create-bon-livraison?receiverEmail=${encodeURIComponent(receiverEmail)}`;
      return this.http.post(url, {});
    }
    
    associateTransactionsToBon(bonId: number, transactionIds: number[]): Observable<any> {
      const url = `${this.apiUrl}/associate-transactions-to-bon?bonId=${bonId}`;
      return this.http.post(url, transactionIds);
    }

    
}