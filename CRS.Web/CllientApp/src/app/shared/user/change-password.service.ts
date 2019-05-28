import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { FormValidatorService } from '../validator/form-validator.service';

@Injectable({
  providedIn: 'root'
})
export class ChangePasswordService {

  constructor(private formbuilder: FormBuilder, private httpClient: HttpClient, private validator: FormValidatorService ) { }
  readonly URL = 'https://localhost:44359/api/User';
  formModel = this.formbuilder.group({
    Passwords: this.formbuilder.group({
      Password: ['', [Validators.required, Validators.minLength(4) ]],
      ConfirmPassword: ['', Validators.required]
    }, {validator: this.validator.comparePasswords})
  });
 
  
  get password() { return this.formModel.get('Passwords.Password'); }
  get cofirmPassword() { return this.formModel.get('Passwords.ConfirmPassword'); }

  changePassword(user) {
    return this.httpClient.put(this.URL + '/ChangePassword', user);
  }
  resetPasswordForAdmin() {
    return this.httpClient.get(this.URL+ '/ForgotPassword')
  }
}
