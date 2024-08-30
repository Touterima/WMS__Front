import {Component, OnInit} from '@angular/core';

import {Router, RouterModule} from "@angular/router";
import { Bon } from '../../models/bon.models';
import { BonService } from '../../services/bon-service.service';
import { CommonModule } from '@angular/common';
import { FixedDecimalPipe } from '../../fixed-decimal.pipe';


@Component({
    standalone: true,
  templateUrl: './livraisons.component.html',
  imports:[CommonModule, RouterModule,FixedDecimalPipe] 
})
export class LivraisonComponent implements OnInit {
    bons: Bon[] = [];
  selectedBon: Bon | null = null;

  selectedBonId: number | undefined;  // Ajoutez cette ligne
  
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
  /**
    bons: Bon[] = [];
  selectedBon: Bon | null = null;

  selectedBonId: number | undefined;  // Ajoutez cette ligne
  

  constructor(private bonService: BonService) {}

  ngOnInit() {
    this.bonService.getBonsDeLivraisonEnvoyeeParCurrentUser()
      .subscribe(bons => {
        this.bons = bons;
      });
  }
   */
}