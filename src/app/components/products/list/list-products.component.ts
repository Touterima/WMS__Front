import { Component, OnInit } from '@angular/core';
import { Produits } from '../../../models/product.models';
import { ProductService } from '../../../services/product-service.service';
import { HttpClient} from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


@Component({
  standalone: true,
  templateUrl: './list-products.component.html',
  imports:[RouterModule]
})
export class ProductListComponent implements OnInit {
 
   produits: Produits[] = [];

  constructor(private productService: ProductService) { }



  ngOnInit(): void {
    this.loadProduits();
  }

  loadProduits(): void {
    this.productService.getProduits().subscribe(data => {
      this.produits = data;
    });
  }

/*
  deleteProduit(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) {
      this.productService.deleteProduit(id).subscribe(
        () => {
          console.log('Produit supprimé avec succès');
          this.loadProduits(); // Recharger la liste après la suppression
        },
        (error) => {
          console.error('Erreur lors de la suppression du produit:', error);
        }
      );
    }
*/
    deleteProduit(id?: number): void {
      if (id&&confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) {
        this.productService.deleteProduit(id).subscribe(
          () => {
            console.log('Produit supprimé avec succès');
            this.loadProduits(); // Recharger la liste après la suppression
          },
          (error) => {
            console.error('Erreur lors de la suppression du produit:', error);
          }
        );
      }
    }
    /*
    deleteProduit(id: number) {
      this.productService.deleteProduit(id).subscribe(() => {
        this.produits = this.produits.filter(produit => produit.id !== id);
      });
    }
      */
/*
    navigateToUpdate(id?: number): void {
      if (id === undefined) {
        console.error('ID du produit non défini');
        return;
      }
      this.router.navigate(['/update', id]);
    }
      */
  }
  
