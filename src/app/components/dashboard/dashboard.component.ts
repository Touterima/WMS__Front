import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  standalone: true,
  templateUrl: './dashboard.component.html',
  imports:[RouterLink,RouterOutlet]
})
export class DashboardComponent implements OnInit {
    ngOnInit(): void {
        
    }

}