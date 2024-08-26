import {Component, OnInit} from '@angular/core';

import { RouterModule} from "@angular/router";
import { Facture } from '../../../models/facture.models';
import { FactureService } from '../../../services/facture-service.services';
import { CommonModule } from '@angular/common';


@Component({
    standalone: true,
  templateUrl: './factureList.component.html',
  imports:[RouterModule, CommonModule]
})
export class FactureListComponent implements OnInit {
    factures: Facture[] = [];
    selectedFacture: Facture | null = null;

  constructor(private factureService: FactureService) {}

  ngOnInit(): void {
    this.loadFactures();
  }

  loadFactures(): void {
    this.factureService.getFactures().subscribe(data => {
      this.factures = data;
    });
  }
  
  selectFacture(facture: Facture): void {
    this.selectedFacture = facture;
  }

  
}