import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../types/user.type';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = 'http://localhost:8000';

  constructor(private httpClient: HttpClient) { }

  getAllUsers(){
    return this.httpClient.get<User[]>(`${this.baseUrl}/users`);
  }

  deleteUserBy(id: string){
    return this.httpClient.delete(`${this.baseUrl}/users/${id}`);
  }

  createUser(user: Omit<User, 'id'>){
    return this.httpClient.post(`${this.baseUrl}/users`, user);
  }

  getUserBy(id: string){
    return this.httpClient.get<User>(`${this.baseUrl}/users/${id}`);
  }

  updateUser(id: string, user: User){
    return this.httpClient.put(`${this.baseUrl}/users/${id}`, user);
  }
}
