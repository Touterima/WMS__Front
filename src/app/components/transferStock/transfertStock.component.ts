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

  constructor(private productService: ProductService, private transactionService: TransactionService,private bonService: BonService ,private userService: UserService, private toastr: ToastrService, private http: HttpClient,private dialog: MatDialog) {

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
onValidate() {
  if (this.form.valid) {
    const targetEmail= this.targetEmail
    if (targetEmail != '') {
      //const receiverEmail = targetEmailControl.value;
      this.userService.getUserByEmail(targetEmail).subscribe(
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
  const dialogRef = this.dialog.open(FacturationDialogComponent);

  dialogRef.afterClosed().subscribe(result => {
    if (result === 'oui' || result === 'non') {
      this.createBonAndGenerateQRCode(user, result === 'oui');
    }
  });
}

private handleOtherRole(user: any) {
  this.createBonAndGenerateQRCode(user, false);
}


private createBonAndGenerateQRCode(user: any, isFacture: boolean) {
  this.bonService.createBon(user.email, this.transactions).subscribe(
    (response) => {
      this.bonService.generateQRCode(response.bonId).subscribe(
        (qrCodeBlob) => {
          this.displayQRCode(qrCodeBlob);
          this.waitForQRCodeScan(response.bonId, isFacture);
        },
        (error) => this.toastr.error('Erreur lors de la génération du QR code')
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

private waitForQRCodeScan(bonId: number, isFacture: boolean) {
  const checkInterval = setInterval(() => {
    this.bonService.checkBonStatus(bonId).subscribe(
      (status) => {
        if (status === 'SCANNED') {
          clearInterval(checkInterval);
          this.finalizeBon(bonId, isFacture);
        }
      },
      (error) => {
        clearInterval(checkInterval);
        this.toastr.error('Erreur lors de la vérification du statut du bon');
      }
    );
  }, 5000); // Vérifie toutes les 5 secondes
}

private finalizeBon(bonId: number, isFacture: boolean) {
  this.bonService.finalizeBon(bonId, isFacture).subscribe(
    () => {
      this.toastr.success('Bon finalisé avec succès');
      this.loadTransactions(); // Recharger les transactions après la finalisation
    },
    (error) => this.toastr.error('Erreur lors de la finalisation du bon')
  );
}
}





/*async onValidate() {
  const targetEmail = this.form.controls['targetEmail'].value;
  const receiverRole = await this.userService.getUserRole(this.receiverId);
  
  if (receiverRole === TypeRole.USER) {
    const userChoice = await this.showFacturationPopup();
    
    if (userChoice === 'non') {
      await this.generateAndHandleQRCode(false);
    } else if (userChoice === 'oui') {
      await this.generateAndHandleQRCode(true);
    }
  } else {
    await this.createBonAndGenerateQRCode();
  }
}*/

/*NoFacture(): void {
  const targetEmail = this.form.get('targetEmail')?.value;
  const transactionIds = this.form.get('transactionIds')?.value;

  // Requête pour récupérer l'utilisateur par email
  this.http.get<User>(`http://localhost:8080/admin/user-by-email/${targetEmail}`).subscribe(
    (receiver) => {
      const receiverId = receiver.id;

      // Appel au backend pour créer le bon et générer le QR code sans facturer
      this.http.post<Bon>(`http://localhost:8080/admin/create-bon?receiverId=${receiverId}`, transactionIds)
        .subscribe(
          (bon) => {
            // Requête pour générer le QR code
            this.http.get(`http://localhost:8080/admin/${bon.id}/qrcode`, { responseType: 'blob' })
              .subscribe((response: Blob) => {
                const url = window.URL.createObjectURL(response);
                const a = document.createElement('a');
                a.href = url;
                a.download = `bon-${bon.id}.png`;
                a.click();
              });
          },
          (error) => {
            console.error('Erreur lors de la création du bon', error);
          }
        );
    },
    (error) => {
      console.error('Erreur lors de la récupération de l\'utilisateur', error);
    }
  );
}*/
/*onValidate() {
  if (this.form.valid) {
    const receiverEmail = this.form.get('targetEmail').value;
    this.userService.getUserByEmail(receiverEmail).subscribe(
      (user) => {
        if (user.role.some(role => role.type === 'USER')) {
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
    this.toastr.error('Veuillez remplir correctement tous les champs');
  }
}
  */