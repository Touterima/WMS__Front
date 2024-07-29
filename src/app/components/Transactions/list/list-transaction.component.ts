import { Component, OnInit } from '@angular/core';

import { HttpClient} from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TransactionService } from '../../../services/transaction-service.service';
import { Transaction } from '../../../models/transaction.models';


@Component({
  standalone: true,
  templateUrl: './list-transaction.component.html',
  imports:[CommonModule, RouterModule]
})
export class TransactionListComponent implements OnInit {
 
   transactions: Transaction[] = [];

  constructor(private transactionService: TransactionService) { }



  ngOnInit(): void {
    this.loadTransactions();
  }

  loadTransactions(): void {
    this.transactionService.getAllTransactions().subscribe(
      (data) => {
        this.transactions = data;
      },
      (error) => {
        console.error('Erreur lors du chargement des transactions:', error);
      }
    );
  }

    deleteTransaction(id?: number): void {
      if (id&&confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) {
        this.transactionService.deleteTransaction(id).subscribe(
            () => {
              console.log('Transaction supprimée avec succès');
              this.loadTransactions(); 
            },
            (error) => {
              console.error('Erreur lors de la suppression du transaction:', error);
            }
          );
      }
    }
}