import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './model/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }
  readonly URL = 'https://localhost:44359/api/ApplicationUser';
  getUserProfile() {
    return this.httpClient.get(this.URL + '/GetUser');
  }
  getUserRole(): string {
    if (localStorage.getItem('token') != null) {
    const roleLoad = JSON.parse(window.atob(localStorage.getItem('token').split('.')[1]));
    return roleLoad.role;
    }
  }
  rolesMatch(roles): boolean  {
    let isMatch = false;

    const userRole = this.getUserRole();
    roles.forEach(element => {
      if (element === userRole) {
        isMatch = true;
      } else {
        isMatch = false;
      }
    });
    return isMatch;
  }
  getUsers(): Observable<User[]>{
    return this.httpClient.get<User[]>(this.URL + '/GetUsers');
  }
}
