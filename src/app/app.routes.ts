import { Routes } from '@angular/router';
import { UsersComponent } from './pages/users/users.component';
import { NewUserComponent } from './pages/new-user/new-user.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/users',
    pathMatch: 'full',
  },
  {
    path: 'users',
    component: UsersComponent,
  }, 
  {
    path: 'users/new',
    component: NewUserComponent,
  },
  {
    path: 'users/:id',
    component: NewUserComponent,
  },
  {
    path: '**',
    redirectTo: '/users',
  }
];
