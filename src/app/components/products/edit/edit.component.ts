import { Component, OnInit } from '@angular/core';
import { Produits } from '../../../models/product.models';
import { ProductService } from '../../../services/product-service.service';
import { HttpClient} from '@angular/common/http';
import { CommonModule } from '@angular/common';


@Component({
  standalone: true,
  templateUrl: './edit.component.html'
})
export class EditComponent implements OnInit {
    ngOnInit(): void {
        throw new Error('Method not implemented.');
    }

}