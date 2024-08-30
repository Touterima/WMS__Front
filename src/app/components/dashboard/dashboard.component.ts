import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { UserService } from '../../services/user-service.service';
import { BonService } from '../../services/bon-service.service';
import { StockService } from '../../services/stock-service.service';
import { ProductService } from '../../services/product-service.service';
import { Chart, ChartOptions, ChartType } from 'chart.js';



@Component({
  standalone: true,
  templateUrl: './dashboard.component.html',
  imports:[RouterLink,RouterOutlet]
})
export class DashboardComponent implements OnInit {
  userCount: number = 0;
  livraisonBonCount: number=0;
  stockCount: number=0;
  productCount: number=0;
  chart: any;

  commandeCount: number=0;


 

  constructor(private userService: UserService, private bonService: BonService, private stockService: StockService, private productService: ProductService) { }

  ngOnInit() {
    this.userService.getUserCount().subscribe(count => {
      this.userCount = count;
    });
    this.bonService.getLivraisonBonCount().subscribe(count => {
      this.livraisonBonCount = count;
    });
    this.stockService.getStockCount().subscribe(count => {
      this.stockCount = count;
    });
    this.productService.getProduitsCount().subscribe(count => {
      this.productCount = count;
    });

    //this.fetchBonStatistics();
    //this.initializeChart();
    }
/*
    fetchBonStatistics() {
        this.bonService.getLivraisonBonCount().subscribe(statistics => {
            this.livraisonBonCount = statistics.livraisonBonCount;
            this.commandeCount = statistics.commandeCount;
            this.updateChartData();
        });
    }

    initializeChart() {
        const ctx = document.getElementById('barChart') as HTMLCanvasElement;
        this.chart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels:   
 ['Livraison', 'Commande'],
                datasets: [{
                    label: 'Nombre de Bons',
                    data: [this.livraisonBonCount, this.commandeCount],
                    backgroundColor: ['#007bff', '#dc3545'],
                    borderColor: ['#007bff', '#dc3545'],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

    updateChartData() {
        this.chart.data.datasets[0].data = [this.livraisonBonCount, this.commandeCount];
        this.chart.update();
    }
        */
}

