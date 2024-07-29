import { Component, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Produits } from '../../../models/product.models';
import { ProductService } from '../../../services/product-service.service';
import { TransactionService } from '../../../services/transaction-service.service';
import { Transaction } from '../../../models/transaction.models';
import { FormsModule } from '@angular/forms';


@Component({
  standalone: true,
  templateUrl: './searchProduct.component.html',
  imports:[RouterModule, FormsModule, CommonModule]
})
export class SearchProductComponent implements OnInit {
    produits: Produits[] = [];
    quantities: { [key: number]: number } = {};
   // quantities: Map<number, number> = new Map();
   filteredProduits: Produits[] = [];
   searchTerm: string = '';
  constructor(private productService: ProductService, private transactionService: TransactionService) { }



  ngOnInit(): void {
    this.loadProduits();
  }

  loadProduits(): void {
    this.productService.getProduits().subscribe(data => {
      this.produits = data;
      this.filteredProduits = data;//

      this.produits.forEach(produit => {
        if (produit.id !== undefined) {
          this.quantities[produit.id] = 1;
        }
      });
    });
  }

  onSearch(): void {
    if (!this.searchTerm) {
      this.filteredProduits = this.produits;
      return;
    }
    

    this.filteredProduits = this.produits.filter(produit =>
      produit.id?.toString().toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      produit.refArt.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      produit.designation.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      produit.collection.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      produit.famille.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      produit.prixVente.toString().toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      produit.prixTtc.toString().toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }


  /**** */
  searchProduits(): void {
    this.filteredProduits = this.produits.filter(produit =>
      produit.refArt?.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      produit.designation?.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      produit.collection?.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      produit.famille?.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  onSearchButtonClick(): void {
    this.searchProduits();
  }
  
/*
  loadProduits() {
    this.productService.getProduits().subscribe(
      (produits) => {
        this.produits = produits;
        // Initialiser les quantités à 1 pour chaque produit
        this.produits.forEach(produit => {
          if (typeof produit.id === 'number') {
            //this.quantities[produit.id] = 1;
            this.quantities.set(produit.id, 1);
          }
        });
      },
      (error) => console.error('Erreur lors du chargement des produits', error)
    );
  }

  getQuantity(id: number | undefined): number {
    return id !== undefined ? this.quantities.get(id) || 1 : 1;
  }

  setQuantity(id: number | undefined, quantity: number) {
    if (id !== undefined) {
      this.quantities.set(id, quantity);
    }
  }
    */
   /*
  createTransaction(produit: Produits) {
    if (produit.id !== undefined) {
      const quantity = this.getQuantity(produit.id)|| 1;
      const transaction: Transaction = {
        id: 0, // L'ID sera généré par le backend
        produits: produit,
        quantity: quantity,
        montant: produit.prixVente * quantity,
        details: `Transaction pour ${quantity} ${produit.designation}`
      };
  
      this.transactionService.createTransaction(transaction).subscribe(
        (createdTransaction) => {
          console.log('Transaction créée', createdTransaction);
        },
        (error) => console.error('Erreur lors de la création de la transaction', error)
      );
    }
  }
 */
  createTransaction(produit: Produits) {
    if (produit.id !== undefined && this.quantities[produit.id] !== undefined) {
      const quantity = this.quantities[produit.id] || 1;
      const transaction: Transaction = {
        id: 0, // L'ID sera généré par le backend
        produits: produit,
        quantity: quantity,
        montant: produit.prixVente * quantity,
        details: `Transaction pour ${quantity} ${produit.designation}`
      };

    this.transactionService.createTransaction(transaction).subscribe(
      (createdTransaction) => {
        console.log('Transaction créée', createdTransaction);
      },
      (error) => console.error('Erreur lors de la création de la transaction', error)
    );
  }
}
  
}