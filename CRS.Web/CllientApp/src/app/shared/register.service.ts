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
    UserName: ['', Validators.required],
    Passwords: this.formbuilder.group({
      Password: ['', [Validators.required, Validators.minLength(6), this.validatePassword]],
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
  validatePassword(fg: FormGroup) {
    let hasNumber = /\d/.test(fg.value);
    let hasUpper = /[A-Z]/.test(fg.value);
    let hasLower = /[a-z]/.test(fg.value);
    const valid = hasNumber && hasUpper && hasLower;
    if (!valid) {
      return {
        errorText: true
      };
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
