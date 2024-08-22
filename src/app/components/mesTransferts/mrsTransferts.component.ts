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
  templateUrl: './mesTransferts.component.html',
  imports:[CommonModule, RouterModule, FormsModule,FixedDecimalPipe, FontAwesomeModule, MatDialogModule] 
})
export class MesTransfertsComponent implements OnInit {
  bons: Bon[] = [];
  selectedBon: Bon | null = null;

  constructor(private bonservice: BonService) { }


  ngOnInit(): void {
    this.loadBons();
  }

  loadBons(): void {
    this.bonservice.getBons().subscribe(data => {
      this.bons = data;
    });
  }
  selectBon(bon: Bon): void {
    this.selectedBon = bon;
  }
}