import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../types/user.type';

export interface PageableResponse<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
  last: boolean;
  size: number;
  number: number;
  numberOfElements: number;
  first: boolean;
  empty: boolean;
  pageable: {
    pageNumber: number;
    pageSize: number;
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    offset: number;
    paged: boolean;
    unpaged: boolean
  }
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = 'http://localhost:8000';

  constructor(private httpClient: HttpClient) { }

  getAllUsers(page?:number){
    return this.httpClient.get<PageableResponse<User>>(`${this.baseUrl}/users?page=${((page || 1) - 1)}`);
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
