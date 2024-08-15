import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Produits } from '../../../models/product.models';
import { ProductService } from '../../../services/product-service.service';
import { TransactionService } from '../../../services/transaction-service.service';
import { Transaction } from '../../../models/transaction.models';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';



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

   //private _success = new Subject<string>();
   //@ViewChild('selfClosingAlert',{static: false}) selfClosingAlert: NgbAlert;
   //successMessage='';
  constructor(private productService: ProductService, private transactionService: TransactionService,private toastr: ToastrService) { }



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
 *//* 
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
*/
createTransaction(produit: Produits) {
  if (produit.id !== undefined && this.quantities[produit.id] !== undefined) {
    const quantity = this.quantities[produit.id] || 1;
    
    // Vérifier si la quantité demandée est disponible
    if (quantity > produit.qte) {
      console.error(`Quantité insuffisante. Disponible : ${produit.qte}, Demandé : ${quantity}`);
      //this.toastr.error(`Quantité insuffisante. Disponible : ${produit.qte}, Demandé : ${quantity}`);
      this.toastr.info(`Quantité insuffisante. Disponible : ${produit.qte}, Demandé : ${quantity}`);
      // Vous pouvez également afficher un message à l'utilisateur ici
      this.showErrorMessage(`Quantité insuffisante pour ${produit.designation}. Disponible : ${produit.qte}`);
      return;
    }

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
        this.toastr.success('Transaction créée avec succés');

        // Mettre à jour la quantité en stock du produit
        //this.updateProductStock(produit.id, (produit.qte - quantity));
      },
      (error) => {
        console.error('Erreur lors de la création de la transaction', error);
        this.showErrorMessage('Erreur lors de la création de la transaction');
      }
    );
  }
}

// Méthode pour mettre à jour le stock du produit
/*private updateProductStock(productId: number, newQuantity: number) {
  this.productService.updateProductStock(productId, newQuantity).subscribe(
    (updatedProduct) => {
      console.log('Stock du produit mis à jour', updatedProduct);
    },
    (error) => {
      console.error('Erreur lors de la mise à jour du stock', error);
      this.showErrorMessage('Erreur lors de la mise à jour du stock');
    }
  );
}*/
private showErrorMessage(message: string) {
  // Implémentez cette méthode selon votre système d'affichage de messages
  // Par exemple, vous pourriez utiliser un service de notification ou un composant de message
  // this.notificationService.showError(message);
  console.error(message); // Pour l'instant, nous affichons juste dans la console
}
  
}