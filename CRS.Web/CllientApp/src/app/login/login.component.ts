import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { LoginService } from '../shared/login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formModel = {
    UserName: '',
    Password: ''
  };
  constructor(private service: LoginService, private communicate: ToastrService, private router: Router) { }

  ngOnInit() {
  }
  onSubmit(form: NgForm) {
    this.service.login(form.value).subscribe(
      (res: any) => {
        localStorage.setItem('token', res.token);
        this.router.navigateByUrl('/zlecenia/wszystkie-zlecenia');
      },
      err => {
        if (err.status === 400) {
          this.communicate.error('Niepoprawna nazwa użytkownika lub hasło.', 'Spróbój ponownie');
        } else {
          console.log(err);
        }
      }
    );
  }

}
