import {ChangeDetectorRef, Component, OnInit} from '@angular/core';

import {Router} from "@angular/router";
import {forkJoin} from "rxjs";
import { UserService } from '../../../services/user-service.service';
import { User } from '../../../models/user.models';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html'
})
export class UserListComponent implements OnInit{
    users: User[] = [];

   // quantities: Map<number, number> = new Map();
   filteredUsers: User[] = [];
   searchTerm: string = '';
  constructor(private userService: UserService) { }


  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getAllUsers().subscribe(
        (data: User[]) => {
          this.users = data;
        },
        error => {
          console.error('Erreur lors du chargement des utilisateurs', error);
        }
      );
  }

  deleteUser(id: number) {
    this.userService.deleteUser(id).subscribe(() => {
      this.users = this.users.filter(user => user.id !== id);
    });
  }
}
  
/*
  loadUsers(): void {
    this.userService.getAllUsers().subscribe(data => {
        this.users = data;
        this.filteredProduits = data;//
  
        this.users.forEach(user => {
          if (user.id !== undefined) {
            this.quantities[user.id] = 1;
          }
        });
    });
  }
    */
