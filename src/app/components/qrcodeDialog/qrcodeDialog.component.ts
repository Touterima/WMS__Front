import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';

@Component({
    standalone: true,
    templateUrl: './qrcodeDialog.component.html',
    imports:[MatDialogModule]
  })
  export class QRCodeDialogComponent {
    constructor(@Inject(MAT_DIALOG_DATA) public data: { imgSrc: string }) {}
  }