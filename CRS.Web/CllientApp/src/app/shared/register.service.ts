import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  constructor(private formbuilder: FormBuilder, private httpClient: HttpClient ) { }
  readonly URL = 'https://localhost:44359/api';
  formModel = this.formbuilder.group({
    UserName: ['', [Validators.required, Validators.minLength(3)]],
    Passwords: this.formbuilder.group({
      Password: ['', [Validators.required, Validators.minLength(4) ]],
      ConfirmPassword: ['', Validators.required]
    }, {validator: this.comparePasswords})
  });

  comparePasswords(fg: FormGroup) {
    const password = fg.get('Password');
    const confirmPasswd = fg.get('ConfirmPassword');
    if (confirmPasswd.errors == null) {
      if (password.value !== confirmPasswd.value) {
        confirmPasswd.setErrors({passwordMismatch: true});
      } else {
        confirmPasswd.setErrors(null);
      }
    }
  }

  registerNewUser() {
    var user = {
      UserName: this.formModel.value.UserName,
      Password: this.formModel.value.Passwords.Password
    };
    return this.httpClient.post(this.URL + '/ApplicationUser/Register', user);
  }
  

}
