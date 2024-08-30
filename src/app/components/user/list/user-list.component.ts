import {ChangeDetectorRef, Component, OnInit} from '@angular/core';

import {Router} from "@angular/router";
import {forkJoin} from "rxjs";
import { UserService } from '../../../services/user-service.service';
import { User } from '../../../models/user.models';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  templateUrl: './user-list.component.html',
  imports:[CommonModule]
})
export class UserListComponent implements OnInit{
  users:any;
  searchTerm:string='';
  searchType:string='surname';
  filteredUsers:any[]=[];
  constructor(private userService:UserService, private router:Router, private cdr: ChangeDetectorRef) {
  }
  ngOnInit(){
    this.fetchUsers();
  }
  fetchUsers(){
    this.userService.getAllUsers().subscribe((users: any) => {
      this.users = users;
      // Create an array of observables

      // Use forkJoin to wait for all HTTP requests to complete
      
    })
  }
  filterUsers() {
    if (!this.searchTerm) {
      this.filteredUsers = this.users;
      return;
    }
    this.filteredUsers = this.users.filter((user: any) => {
        if (this.searchType==='address'){
          return user.address.city.toLowerCase().includes(this.searchTerm.toLowerCase()) || user.address.state.toLowerCase().includes(this.searchTerm.toLowerCase()) || user.address.country.toLowerCase().includes(this.searchTerm.toLowerCase()) || user.address.postalCode.toLowerCase().includes(this.searchTerm.toLowerCase());
        }
        if (this.searchType==='role'){
          return user.role[0].type.toLowerCase().includes(this.searchTerm.toLowerCase());
        }
        return user[this.searchType].toLowerCase().includes(this.searchTerm.toLowerCase());
    });
  }
  deleteUser(u: any) {
    this.userService.deleteUser(u.id).subscribe(() => {
      // Remove the deleted user from the users array
      this.users = this.users.filter((user: any) => user.id !== u.id);
      this.cdr.detectChanges();
    });
  }
  edit(u:any){
    this.router.navigate([`/admin/editUser/${u.id}`])
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
