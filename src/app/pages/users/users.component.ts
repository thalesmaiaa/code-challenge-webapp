import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { take } from 'rxjs';
import { User } from '../../types/user.type';
import { ToastrService } from 'ngx-toastr';
import { Error, PageableResponse } from '../../types/requests.type';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  
  currentPage: number = 1;
  itemsPerPage = 10; 
  isLastPage = false;
  totalPages = 0;
  loading = false;

  setData = (data: PageableResponse<User>) => {
    this.users = data.content;
    this.currentPage = data.content.length  ? data.pageable.pageNumber + 1 : 0;
    this.isLastPage = data.last;
    this.totalPages = data.totalPages;
    this.loading = false;
  }

  nextPage () {
    if(!this.isLastPage){
      const nextPage = this.currentPage + 1;
      this.currentPage = nextPage;
      this.userService.getAllUsers(nextPage).pipe(take(1)).pipe(take(1)).subscribe(this.setData);
    }
  }

  prevPage() {
    if(this.currentPage !== 1){
      const nextPage = this.currentPage - 1;
      this.currentPage = nextPage;
      this.userService.getAllUsers(nextPage).pipe(take(1)).pipe(take(1)).subscribe(this.setData);
    }
  }

  constructor(private userService: UserService, private toaster: ToastrService, private router: Router,) {
    this.toaster = toaster;
  }

  ngOnInit() {
    this.loading = true;
    this.userService.getAllUsers().pipe(take(1)).subscribe(this.setData);
  }

  onDeleteUser(id: string) {
    this.userService.deleteUserBy(id).subscribe({
      next: () => {
        this.users = this.users.filter((user) => user.id !== id);
        this.toaster.success('User deleted successfully');
      },
      error: (error: Error) => {
        const { message } = error.error;
        this.toaster.error(message);
      },
    })
  }

  redirectToNewUser(){
    this.router.navigate(['users/new']);
  }

  onUpdateUser(id: string){
    this.router.navigate([`users/${id}`]);
  }

}
