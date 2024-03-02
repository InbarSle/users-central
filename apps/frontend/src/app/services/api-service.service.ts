import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {IUser} from '@users-central/shared'
import { ApiCreateUserReq, ApiUpdateUserReq } from './interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  apiUrl = 'http://localhost:3010/api/users';
  headers = new HttpHeaders().set('Content-Type', 'application/json').set('Accept', 'application/json');
  httpOptions = {
    headers: this.headers
  };

  constructor(private http: HttpClient) { }

  getAllUsers$() {
    return this.http.get<IUser[]>(this.apiUrl);
  }

  getUser$(id: string) {
    return this.http.get<IUser>(`${this.apiUrl}/${id}`);
  }

  updateUser$(id: string, updateUserData: ApiUpdateUserReq) {
    return this.http.put<IUser>(`${this.apiUrl}/${id}`, {
      ...updateUserData
    }, this.httpOptions);
  }

  createUser$(createUserData: ApiCreateUserReq) {
    return this.http.post<IUser>(`${this.apiUrl}`, {
      ...createUserData
    }, this.httpOptions);
  }
}
