import {Component, OnInit} from '@angular/core';

import {Router, RouterModule} from "@angular/router";

@Component({
    standalone: true,
  templateUrl: './facture.component.html',
  imports:[RouterModule]
})
export class FactureComponent implements OnInit {
    ngOnInit(): void {
        throw new Error('Method not implemented.');
    }

}