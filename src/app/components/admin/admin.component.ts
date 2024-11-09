import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user-service.service';

@Component({
  standalone: true,
  templateUrl: './admin.component.html',
  imports:[RouterLink,RouterOutlet]
})
export class AdminComponent implements OnInit {
  
  constructor(public authService: AuthService, private router: Router, private userService: UserService) {
  }
  
    ngOnInit(): void {
        
    }

    logout() {
      this.authService.logout().subscribe(
        (data: any) => {
          localStorage.removeItem('token');
          console.log('Logout successful:', data.message);
          window.location.href = '/';
        },
        error => {
          console.error('Logout error:', error);
        }
      );
    }

}