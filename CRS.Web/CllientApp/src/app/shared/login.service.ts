import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient: HttpClient) { }
  readonly URL = 'https://localhost:44359/api/ApplicationUser';
  login(userToLogin) {
    return this.httpClient.post(this.URL + '/Login', userToLogin);
  }

  getUserProfile() {
    return this.httpClient.get(this.URL + '/GetUser');
  }
}
