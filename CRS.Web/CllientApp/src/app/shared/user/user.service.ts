import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../model/user';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient, private router: Router) { }
  readonly URL = 'https://localhost:44359/api/User';
  getUserProfile() {
    return this.httpClient.get(this.URL + '/GetUser');
  }
  getUserRole(): string {

    if (localStorage.getItem('token') != null) {
      const roleLoad = JSON.parse(window.atob(localStorage.getItem('token').split('.')[1]));
      return roleLoad.role;
    }
  }
  rolesMatch(roles): boolean {
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
  getUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.URL + '/GetUsers');
  }
  deleteUser(id: string) {

    return this.httpClient.delete(`${this.URL}/${'DeleteUser/'}${id}`);

  }
  onLogout() {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/login');
  }
}
