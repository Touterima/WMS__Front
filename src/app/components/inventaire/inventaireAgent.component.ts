import {Component, OnInit} from '@angular/core';

import {Router, RouterModule} from "@angular/router";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { StockService } from '../../services/stock-service.service';
import { Stock } from '../../models/stock.models';

@Component({
    standalone: true,
  templateUrl: './inventaireAgent.component.html',
  imports:[RouterModule, FontAwesomeModule]
})
export class InventaireAgentComponent implements OnInit {
    stock: Stock = {
        name: '',
        details: '',
        stockItems: []
      };

  constructor(private stockService: StockService) { }

  ngOnInit(): void {
    this.loadStock();
  }

  loadStock(): void {
    this.stockService.getCurrentUserStock().subscribe({
      next: (data) => {
        this.stock = data;
      },
      error: (error) => {
        console.error('Error fetching stock:', error);
      }
    });
  }
  /* stock: Stock | null = null;

      constructor(private stockService: StockService) {}
    
      ngOnInit() {
        this.stockService.getCurrentUserStock().subscribe(stock => {
          this.stock = stock;
        });
      }
        */
  
}