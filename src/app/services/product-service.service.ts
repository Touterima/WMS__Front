import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Produits } from '../models/product.models';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  
  private baseUrl = 'http://localhost:8080/admin';

  constructor(private http: HttpClient) { }

  getProduits(): Observable<Produits[]> {
    return this.http.get<Produits[]>(`${this.baseUrl}/product-list`);
  }

  getProduitById(id: number): Observable<Produits> {
    return this.http.get<Produits>(`${this.baseUrl}/produit/${id}`);
  }

  createProduit(produit: Produits): Observable<Produits> {
    return this.http.post<Produits>(`${this.baseUrl}/add-product`, produit);
  }

  updateProduit(id: number, produit: Produits): Observable<Produits> {
    return this.http.put<Produits>(`${this.baseUrl}/update/${id}`, produit);
  }

  deleteProduit(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/${id}`);
  }
}
