import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  standalone: true,
  templateUrl: './admin.component.html',
  imports:[RouterLink,RouterOutlet]
})
export class AdminComponent implements OnInit {
    ngOnInit(): void {
        
    }

}