import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormValidatorService } from '../validator/form-validator.service';


@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  constructor(private formbuilder: FormBuilder, private httpClient: HttpClient, private validator: FormValidatorService ) { }
  readonly URL = 'https://localhost:44359/api/User';
  formModel = this.formbuilder.group({
    UserName: ['', [Validators.required, Validators.minLength(3)]],
    Passwords: this.formbuilder.group({
      Password: ['', [Validators.required, Validators.minLength(4) ]],
      ConfirmPassword:  ['', Validators.required]
    }, {validator:this.validator.comparePasswords})
  });
  get userName() { return this.formModel.get('UserName'); }
  get password() { return this.formModel.get('Passwords.Password'); }
  get cofirmPassword() { return this.formModel.get('Passwords.ConfirmPassword'); }

 



  

  registerNewUser() {
    var user = {
      UserName: this.formModel.value.UserName,
      Password: this.formModel.value.Passwords.Password
    };
    return this.httpClient.post(this.URL + '/Register', user);
  }
  
  

}
