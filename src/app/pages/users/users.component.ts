import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { take } from 'rxjs';
import { User } from '../../types/user.type';
import { ToastrService } from 'ngx-toastr';
import { Error } from '../../types/requests.type';
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
export class UsersComponent {
  users: User[] = [];

  constructor(private userService: UserService, private toaster: ToastrService, private router: Router,) {
    this.toaster = toaster;
    this.userService.getAllUsers().pipe(take(1)).subscribe((users) => this.users = users)
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

  onCreateUser(user: Omit<User, 'id'>) {
    this.userService.createUser(user).subscribe({
      next: (user) => {
        this.users = [...this.users, user as User];
        this.toaster.success('User created successfully)');
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
