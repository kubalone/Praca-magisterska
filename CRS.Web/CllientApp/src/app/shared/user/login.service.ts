import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient: HttpClient) { }
  readonly URL = 'https://localhost:44359/api/User';


  login(userToLogin) {
    return this.httpClient.post(this.URL + '/Login', userToLogin);
  }


}
