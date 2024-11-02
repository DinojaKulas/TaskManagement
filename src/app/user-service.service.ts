import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  url = 'http://localhost:5062/api/users';

  constructor(private http:HttpClient) { }

  getUsers() {
    return this.http.get<User[]>(this.url);
  }

  createUser(user: any) {
    return this.http.post(this.url, user);
  }

  deleteUser(userId: number) {
    return this.http.delete(this.url + "/" + userId);
  }

  getUser(userId: number) {
    return this.http.get<User>(this.url + "/" + userId);
  }

  updateUser(user: User) {
    return this.http.put(this.url + "/" + user.id, user);
  }
}
export interface User {
address: any;
  id: number;
  name: string;
  email: string;
  password: string;
  phone: string;
}
export interface Address{
  addressLine1:string;
  addressLine2:string;
  city:string;
}

