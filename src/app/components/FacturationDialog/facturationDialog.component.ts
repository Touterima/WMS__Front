import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';

import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';

@Component({
  standalone: true,
    template: `
    <div class="modal-dialog">
      <h2 mat-dialog-title>Facturer?</h2>
      <mat-dialog-content>Voulez-vous facturer ces transactions ?</mat-dialog-content>
      <mat-dialog-actions>
        <button mat-button [mat-dialog-close]="'non'">Non</button>
        <button mat-flat-button [mat-dialog-close]="'oui'">Oui</button>
      </mat-dialog-actions>
    </div>
    
  `,
  imports:[MatDialogModule, RouterModule, MatButtonModule, MatDividerModule ]
  })
export class FacturationDialogComponent {}

  

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
            <button type="button" class="btn btn-primary">Oui</button>
          </div>
        </div>
        <!-- /.modal-content -->
      </div>
      <!-- /.modal-dialog -->
    </div>
   */
