import { Component, OnInit } from '@angular/core';

import { HttpClient} from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TransactionService } from '../../../services/transaction-service.service';
import { Transaction } from '../../../models/transaction.models';
import { FixedDecimalPipe } from '../../../fixed-decimal.pipe';
import { FormsModule } from '@angular/forms';
import { BonService } from '../../../services/bon-service.service';


@Component({
  standalone: true,
  templateUrl: './list-transaction.component.html',
  imports:[CommonModule, RouterModule, FixedDecimalPipe, FormsModule] 
})
export class TransactionListComponent implements OnInit {
 
   transactions: Transaction[] = [];
   showReceiverForm = false;
   receiver: any = { email: '', address: '' };

   errorMessage: string | null = null;


  constructor(private transactionService: TransactionService, private bonService: BonService , private http: HttpClient) { }



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

  
  onValidateTransactions(): void {
    this.showReceiverForm = true;
  }

 /* onSubmitReceiver(): void {
    if (!this.receiver.email) {
      this.errorMessage = "L'email du destinataire est requis.";
      return;
    }
  
    // Créer le bon de livraison
    const bonLivraison = {
      type: 'livraison',
      transactions: this.transactions.map(t => t.id),
      receiver: this.receiver.email,
      date: new Date()
    };
  
    this.bonService.createBonLivraison(bonLivraison).subscribe(
      (response) => {
        console.log('Bon de livraison créé', response);
        this.showReceiverForm = false;
        this.errorMessage = null;
        this.loadTransactions();
      },
      (error) => {
        console.error('Erreur lors de la création du bon de livraison', error);
        this.errorMessage = "Erreur lors de la création du bon de livraison. Veuillez réessayer.";
      }
    );
  }*/
    onSubmitReceiver() {
      this.transactionService.createBonLivraison(this.receiver.email).subscribe(
        bon => {
          console.log('Bon de livraison créé:', bon);
          const transactionIds = this.transactions.map(t => t.id);
          this.transactionService.associateTransactionsToBon(bon.id, transactionIds).subscribe(
            updatedBon => {
              console.log('Transactions associées au bon:', updatedBon);
              this.showReceiverForm = false;
              // Réinitialiser ou rediriger selon vos besoins
            },
            error => console.error('Erreur lors de l\'association des transactions:', error)
          );
        },
        error => console.error('Erreur lors de la création du bon de livraison:', error)
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



/*
    onValidateTransactions() {
      this.showReceiverForm = true;
    }
    onSubmitReceiver() {
      const transactionIds = this.transactions.map(t => t.id);
      this.transactionService.createBonLivraison(transactionIds, this.receiver.id).subscribe(
        bon => {
          console.log('Bon de livraison créé:', bon);
          this.showReceiverForm = false;
          
        },
        error => console.error('Erreur lors de la création du bon de livraison:', error)
      );
    }

    */
/*
    onSubmitReceiver() {
      this.transactionService.createBonLivraison(this.transactions, this.receiver).subscribe(
        bon => {
          console.log('Bon de livraison créé:', bon);
          this.showReceiverForm = false;
          // Réinitialiser ou rediriger selon vos besoins
        },
        error => console.error('Erreur lors de la création du bon de livraison:', error)
      );
    }
*/
/*
onSubmitReceiver(): void {
  const params = {
    transactionIds: this.transactions.map(t => t.id),
    receiverEmail: this.receiver.email,
    receiverAddress: this.receiver.address
  };
  this.http.post('http://localhost:4200/admin/createBon', null, { params }).subscribe(
    response => {
      console.log('Bon de livraison créé:', response);
      this.showReceiverForm = false;
    },
    error => {
      console.error('Erreur lors de la création du bon de livraison:', error);
      this.errorMessage = error.error;
    }
  );
}
  */


}