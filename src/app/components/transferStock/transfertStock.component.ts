import { Component, OnInit } from '@angular/core';

import { HttpClient} from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
//import { fa-trash-can } from '@fortawesome/free-solid-svg-icons';
//import { faTrash } from '@fortawesome/free-solid-svg-icons'import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { Produits } from '../../models/product.models';
import { ProductService } from '../../services/product-service.service';
import { Transaction } from '../../models/transaction.models';
import { BehaviorSubject } from 'rxjs';



import { ToastrService } from 'ngx-toastr';
import { TransactionService } from '../../services/transaction-service.service';
import { FixedDecimalPipe } from '../../fixed-decimal.pipe';
import { UserService } from '../../services/user-service.service';
import { User } from '../../models/user.models';
import { Bon } from '../../models/bon.models';
import { BonService } from '../../services/bon-service.service';
import { QRCodeDialogComponent } from '../qrcodeDialog/qrcodeDialog.component';
import { FacturationDialogComponent } from '../FacturationDialog/facturationDialog.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';



@Component({
  standalone: true,
  templateUrl: './transfertStock.component.html',
  imports:[CommonModule, RouterModule, FormsModule,FixedDecimalPipe, FontAwesomeModule, MatDialogModule] 
})
export class TransfertStockComponent implements OnInit {

  icon = faTrash;

  transactions: Transaction[] = [];
  produits: Produits[] = [];
  quantities: { [key: number]: number } = {};
   // quantities: Map<number, number> = new Map();
   filteredProduits: Produits[] = [];
   searchTerm: string = '';

   errorMessage: string | null = null;
   //private _success = new Subject<string>();
   //@ViewChild('selfClosingAlert',{static: false}) selfClosingAlert: NgbAlert;
   //successMessage='';
   form: FormGroup = new FormGroup({});
  

   targetEmail: string ='';
   email: string = '';
  user: any;


  private userSubject = new BehaviorSubject<User | null>(null);
  user$ = this.userSubject.asObservable();
  

  constructor(private productService: ProductService, private transactionService: TransactionService,private bonService: BonService ,private userService: UserService, private toastr: ToastrService, private http: HttpClient,private dialog: MatDialog) {

   }

  

   onSubmit(){
    
   }


  ngOnInit(): void {
    this.loadProduits();
    this.loadTransactions();
    this.form = new FormGroup({
      targetEmail: new FormControl('', [Validators.required, Validators.email]),
    });

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

  loadProduits(): void {
    this.productService.getProduits().subscribe(data => {
      this.produits = data;
      this.filteredProduits = data;//

      this.produits.forEach(produit => {
        if (produit.id !== undefined) {
          this.quantities[produit.id] = 1;
        }
      });
    });
  }

  onSearch(): void {
    if (!this.searchTerm) {
      this.filteredProduits = this.produits;
      return;
    }
    

    this.filteredProduits = this.produits.filter(produit =>
      produit.id?.toString().toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      produit.refArt.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      produit.designation.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      produit.collection.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      produit.famille.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      produit.prixVente.toString().toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      produit.prixTtc.toString().toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }


  /**** */
  searchProduits(): void {
    this.filteredProduits = this.produits.filter(produit =>
      produit.refArt?.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      produit.designation?.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      produit.collection?.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      produit.famille?.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  onSearchButtonClick(): void {
    this.searchProduits();
  }
  

createTransaction(produit: Produits) {
  if (produit.id !== undefined && this.quantities[produit.id] !== undefined) {
    const quantity = this.quantities[produit.id] || 1;
    
    // Vérifier si la quantité demandée est disponible
    if (quantity > produit.qte) {
      console.error(`Quantité insuffisante. Disponible : ${produit.qte}, Demandé : ${quantity}`);
      //this.toastr.error(`Quantité insuffisante. Disponible : ${produit.qte}, Demandé : ${quantity}`);
      this.toastr.info(`Quantité insuffisante. Disponible : ${produit.qte}, Demandé : ${quantity}`);
      // Vous pouvez également afficher un message à l'utilisateur ici
      this.showErrorMessage(`Quantité insuffisante pour ${produit.designation}. Disponible : ${produit.qte}`);
      return;
    }

    const transaction: Transaction = {
      id: 0, // L'ID sera généré par le backend
      produits: produit,
      quantity: quantity,
      montant: produit.prixVente * quantity,
      details: `Transaction pour ${quantity} ${produit.designation}`
    };

    this.transactionService.createTransaction(transaction).subscribe(
      (createdTransaction) => {
        console.log('Transaction créée', createdTransaction);
        this.toastr.success('Transaction créée avec succés');
        this.loadTransactions();

        // Mettre à jour la quantité en stock du produit
        //this.updateProductStock(produit.id, (produit.qte - quantity));
      },
      (error) => {
        console.error('Erreur lors de la création de la transaction', error);
        this.showErrorMessage('Erreur lors de la création de la transaction');
      }
    );
  }
}

private showErrorMessage(message: string) {
  // Implémentez cette méthode selon votre système d'affichage de messages
  // Par exemple, vous pourriez utiliser un service de notification ou un composant de message
  // this.notificationService.showError(message);
  console.error(message); // Pour l'instant, nous affichons juste dans la console
}

deleteTransaction(id?: number): void {
  if (id&&confirm('Êtes-vous sûr de vouloir supprimer la transaction ?')) {
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


searchUser() {
  this.userService.getUserByEmail(this.targetEmail).subscribe(

    (data) => {
      this.user = data,
      this.userSubject.next(data);
      this.toastr.info('Utilisateur trouvé. Cliquez sur Valider pour continuer.');
    }
  );
}

/*onValidate() {
  const targetEmail= this.targetEmail;
  if (targetEmail !== '') {
    //const receiverEmail = targetEmailControl.value;
    this.userService.getUserByEmail(this.targetEmail).subscribe(
      
      (user) => {
        if (user.role.some((role: any) => role.type === 'USER')) {
          this.handleUserRole(user);
          this.toastr.info(`Client trouvé avec l'adresse ${this.targetEmail}`);
        } else {
          this.handleOtherRole(user);
          this.toastr.info('***22222222222***');
        }
      },
      (error) => {
        this.toastr.error('Erreur lors de la récupération des informations de l\'utilisateur');
      }
    );
  } else {
    this.toastr.error('Champ email manquant');
  }
    
}*/
onValidate() {
  const user = this.userSubject.getValue();
  if (user) {
    if (user.role.some((role: any) => role.type === 'USER')) {
      this.handleUserRole(user);
      this.toastr.info(`Client trouvé avec l'adresse ${this.targetEmail}`);
    } else {
      this.handleOtherRole(user);
      this.toastr.info('***22222222222***');
    }
  } else {
    this.toastr.error('Aucun utilisateur trouvé. Veuillez d\'abord rechercher un utilisateur.');
  }
}
/********************************************************************************** */
/*onValidate() {
  if (this.form.valid) {
    const targetEmailControl = this.form.get('targetEmail');
    if (targetEmailControl) {
      const receiverEmail = targetEmailControl.value;
      this.userService.getUserByEmail(receiverEmail).subscribe(
        (user) => {
          if (user.role.some((role: any) => role.type === 'USER')) {
            this.handleUserRole(user);
          } else {
            this.handleOtherRole(user);
          }
        },
        (error) => {
          this.toastr.error('Erreur lors de la récupération des informations de l\'utilisateur');
        }
      );
    } else {
      this.toastr.error('Champ email manquant');
    }
  } else {
    this.toastr.error('Veuillez remplir correctement tous les champs');
  }
}
  */


private handleUserRole(user: any) {
  const dialogRef = this.dialog.open(FacturationDialogComponent, { width: '250px' });

  dialogRef.afterClosed().subscribe(result => {
    if (result === 'oui') {
      this.createBonAndGenerateQRCode(user, true);
      console.log('Bon créé avec succès');
      
      this.toastr.error('ouiiiiiiiiii');
    } else {
      this.createBonAndGenerateQRCode(user, false);
      console.log('Utilisateur a cliqué sur Non');
    }
  });
}

private handleOtherRole(user: any) {
  this.createBonAndGenerateQRCode(user, false);
}


private createBonAndGenerateQRCode(user: any, tofactur: boolean) {
  const transactionIds = this.transactions.map(transaction => transaction.id);
  this.bonService.createBonCommande(user.id, transactionIds).subscribe(
    (response) => {
      this.bonService.getBonQRCode(response.bonId).subscribe(
        (qrCodeBlob) => {
          this.displayQRCode(qrCodeBlob);
          this.waitForQRCodeScan(response.bonId, tofactur);
        },
      //  (error) => this.toastr.error('Erreur lors de la génération du QR code')
      );
    },
    (error) => this.toastr.error('Erreur lors de la création du bon')
  );
}


private displayQRCode(qrCodeBlob: Blob) {
  const reader = new FileReader();
  reader.onloadend = () => {
    const imgSrc = reader.result as string;
    const dialogRef = this.dialog.open(QRCodeDialogComponent, {
      data: { imgSrc }
    });

    dialogRef.afterClosed().subscribe(() => {
      // Le QR code a été fermé, vous pouvez ajouter une logique supplémentaire ici si nécessaire
    });
  };
  reader.readAsDataURL(qrCodeBlob);
}

  private waitForQRCodeScan(bonId: number, tofactur: boolean) {
    const checkInterval = setInterval(() => {
      this.bonService.checkBonStatus(bonId).subscribe(
        (status) => {
          if (status === 'SCANNED') {
            clearInterval(checkInterval);
            this.finalizeBon(bonId, tofactur);
          }
        },
        (error) => {
          clearInterval(checkInterval);
          this.toastr.error('Erreur lors de la vérification du statut du bon');
        }
      );
    }, 5000); // Vérifie toutes les 5 secondes
  }

  private finalizeBon(bonId: number, tofactur: boolean) {
    this.bonService.finalizeBon(bonId, tofactur).subscribe(
      () => {
        this.toastr.success('Bon finalisé avec succès');
        this.loadTransactions(); // Recharger les transactions après la finalisation
      },
      (error) => this.toastr.error('Erreur lors de la finalisation du bon')
    );
  }
}
