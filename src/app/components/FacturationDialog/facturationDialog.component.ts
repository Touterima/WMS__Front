import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
 
@Component({
  standalone: true,
  template: `<div class="modal-dialog">
  <h2 mat-dialog-title>Facturer?</h2>
  <mat-dialog-content>{{ message }}</mat-dialog-content>
  <mat-dialog-actions>
  <button type="button" (click)="onNoClick()" [mat-dialog-close]="'non'">Non</button>
  <button type="button" (click)="onYesClick()" [mat-dialog-close]="'oui'">Oui</button>
  </mat-dialog-actions>
</div>`,
  imports: [MatDialogModule, RouterModule, MatButtonModule, MatDividerModule]
})
export class FacturationDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<FacturationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public message: string
  ) { }
 
  ngOnInit() {
    if (!this.message) {
      this.message = 'Voulez-vous facturer ces transactions ?';
    }
  }
 
  onYesClick(): void {
    this.dialogRef.close('oui');
    console.log('Oui clicked');
  }
 
  onNoClick(): void {
    this.dialogRef.close('non');
    console.log('No clicked'); // Fixed console.log
  }
}
/*import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';

import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';

@Component({
  standalone: true,
  templateUrl:'./facturationDialog.component.html',
  
  imports:[MatDialogModule, RouterModule, MatButtonModule, MatDividerModule]
  })
export class FacturationDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<FacturationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public message: string // Optional for custom message
  ) { }

  ngOnInit() {
    // Optional: Set a default message if no data is provided
    if (!this.message) {
      this.message = 'Voulez-vous facturer ces transactions ?';
    }
  }

  onYesClick(): void {
    this.dialogRef.close('oui'); // Close dialog and return 'oui' as result
  }

  onNoClick(): void {
    this.dialogRef.close('non');
    console.log // Close dialog and return 'non' as result
  }
}

  /**

  afterClosed(){

  }
   (click)="afterClosed()"
   */

  /**
   * 


    <div class="modal fade">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title">Facturer</h4>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <p>Voulez-vous facturer ces transactions ?</p>
          </div>
          <div class="modal-footer justify-content-between">
            <button type="button" class="btn btn-default" data-dismiss="modal" >non</button>
            <button type="button" class="btn btn-primary" [mat-dialog-close]="'oui'" >Oui</button>
          </div>
        </div>
        <!-- /.modal-content -->
      </div>
      <!-- /.modal-dialog -->
    </div>
   */
