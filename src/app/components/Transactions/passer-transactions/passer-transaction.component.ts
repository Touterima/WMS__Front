import { Component, OnInit } from '@angular/core';
import { Produits } from '../../../models/product.models';
import { ProductService } from '../../../services/product-service.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  standalone: true,
  templateUrl: './passer-transaction.component.html',
  imports: [CommonModule, FormsModule]
})
export class PasserTransactionsComponent {
}