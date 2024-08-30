import { Component, OnInit } from '@angular/core';
import { Stock } from '../../../models/stock.models';
import { StockService } from '../../../services/stock-service.service';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({ 
    standalone: true,
  templateUrl: './inventaireAdmin.component.html',
  imports:[RouterModule, FontAwesomeModule]
})
export class InventaireAdminComponent implements OnInit {
  stocks: Stock[] = [];
  selectedStock: Stock | null = null;
  stockAdmin: Stock = {
    name: '',
    details: '',
    stockItems: []
  };

  constructor(private stockService: StockService) {}

  ngOnInit() {
    this.stockService.getAllStocks().subscribe(stocks => {
      this.stocks = stocks;   

    });
    this.loadStockAdmin();
    
}

loadStockAdmin(): void {
  this.stockService.getCurrentUserStock().subscribe({
    next: (data) => {
      this.stockAdmin = data;
    },
    error: (error) => {
      console.error('Error fetching stock:', error);
    }
  });
}
  selectStock(stock: Stock) {
    this.selectedStock = stock;
  }
}