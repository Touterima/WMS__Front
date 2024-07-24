import { Component, OnInit } from '@angular/core';
import { Produits } from '../../../models/product.models';
import { ProductService } from '../../../services/product-service.service';
import { HttpClient} from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink, RouterModule, RouterOutlet } from '@angular/router';


@Component({
  standalone: true,
  templateUrl: './edit.component.html',
  imports: [CommonModule, FormsModule, RouterLink]
})
export class EditComponent implements OnInit {

  produit: Produits;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService
  ) {
    this.produit = {} as Produits;
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadProduct(+id);
    } else {
      console.error('Aucun ID de produit fourni');
      this.router.navigate(['/admin/product-list']);
    }
  }

  loadProduct(id: number): void {
    this.productService.getProduitById(id).subscribe(
      (product: Produits) => {
        this.produit = product;
      },
      error => {
        console.error('Erreur lors du chargement du produit', error);
        this.router.navigate(['/admin/product-list']);
      }
    );
  }

  onSubmit(): void {
    if (this.produit.id) {
      this.productService.updateProduit(this.produit.id, this.produit).subscribe(
        () => {
          console.log('Produit mis à jour avec succès');
          this.router.navigate(['/admin/product-list']);
        },
        error => {
          console.error('Erreur lors de la mise à jour du produit', error);
        }
      );
    } else {
      console.error('Impossible de mettre à jour le produit : ID manquant');
    }
  }
}