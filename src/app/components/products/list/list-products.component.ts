import { Component, OnInit } from '@angular/core';
import { Produits } from '../../../models/product.models';
import { ProductService } from '../../../services/product-service.service';
import { HttpClient} from '@angular/common/http';
import { CommonModule } from '@angular/common';


@Component({
  standalone: true,
  templateUrl: './list-products.component.html'
})
export class ProductListComponent implements OnInit {
 
   produits: Produits[] = [];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getProduits().subscribe(data => {
      this.produits = data;
    });
  }

}