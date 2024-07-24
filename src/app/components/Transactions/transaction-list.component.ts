import { Component, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


@Component({
  standalone: true,
  templateUrl: './transaction-list.component.html'
})
export class TransactionListComponent implements OnInit {
    ngOnInit(): void {
        throw new Error('Method not implemented.');
    }

}
