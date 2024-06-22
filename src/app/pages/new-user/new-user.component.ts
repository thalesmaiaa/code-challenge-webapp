

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './new-user.component.html',
  styleUrl: './new-user.component.scss',
})
export class NewUserComponent implements OnInit {
  form: FormGroup;
  id: string | null;

  constructor(
    private userService: UserService, 
    private router: Router,
    private toaster: ToastrService,
    private route: ActivatedRoute
  ){
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl(''),
      departmentType: new FormControl(''),
    });
    this.id = null;
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.id = id;

    if(id){
      this.userService.getUserBy(id).subscribe({
        next: (user) => this.form.patchValue(user)
      });
    }
  }

  onReturn =() => {
    this.router.navigate(['users']);
  }

  createUser(){
    this.userService.createUser(this.form.value).subscribe({
      next: () => this.toaster.success('User created successfully').onHidden.subscribe(this.onReturn),
      error: (error) => this.toaster.error(error),
    });
  }

  updateUser(){
    this.userService.updateUser(this.id as string, this.form.value).subscribe({
      next: () => this.toaster.success('User Updated successfully').onHidden.subscribe(this.onReturn),
      error: (error) => this.toaster.error(error),
    });
  }

  submit(event: Event) {
    event.preventDefault();

    const { status} = this.form
    const isFormValid = status === 'VALID';

    if(isFormValid){
      this.id ? this.updateUser() : this.createUser();
    }
  }

}