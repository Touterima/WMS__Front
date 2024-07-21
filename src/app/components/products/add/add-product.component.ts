import { Component, OnInit } from '@angular/core';
import { Produits } from '../../../models/product.models';
import { ProductService } from '../../../services/product-service.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  standalone: true,
  templateUrl: './add-product.component.html',
  imports: [CommonModule, FormsModule]
})
export class AddProductComponent {

  newProduct: Produits = {
    refArt: '',
    designation: '',
    collection: '',
    famille: '',
    fournisseur: '',
    refFourn: '',
    qte: 0,
    unite: '',
    tva: 0,
    prixAchat: 0,
    prixVente: 0,
    prixTtc: 0
  };

  message: string = '';
  messageClass: string = '';

  constructor(private productService: ProductService) {}

  onSubmit() {
    this.productService.createProduit(this.newProduct).subscribe({
      next: (response) => {
        console.log('Produit ajouté avec succès', response);
        this.message = 'Produit ajouté avec succès!';
        this.messageClass = 'success';
        this.resetForm();
      },
      error: (error) => {
        console.error('Erreur lors de l\'ajout du produit', error);
        this.message = 'Erreur lors de l\'ajout du produit. Veuillez réessayer.';
        this.messageClass = 'error';
      }
    });
  }

  resetForm() {
    this.newProduct = {
      refArt: '',
      designation: '',
      collection: '',
      famille: '',
      fournisseur: '',
      refFourn: '',
      qte: 0,
      unite: '',
      tva: 0,
      prixAchat: 0,
      prixVente: 0,
      prixTtc: 0
    };
  }
}
