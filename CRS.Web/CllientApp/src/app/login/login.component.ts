import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { LoginService } from '../shared/user/login.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  showSpinner=false; 
 
  constructor(private service: LoginService, private communicate: ToastrService, private router: Router, private modalService: NgbModal) { }

  ngOnInit() {
    if (localStorage.getItem('token') != null) {
      this.router.navigateByUrl('/naprawy');
    }
  }
  formModel = {
    userName: '',
    password: ''
  }
  onSubmit(form: NgForm) {
    this.showSpinner = true;
    this.service.login(form.value).subscribe(
      (res: any) => {
        localStorage.setItem('token', res.token);
        this.router.navigateByUrl('/naprawy/aktualne-naprawy');
      },
      err => {
        if (err.status === 400) {
          this.showSpinner = false;
          this.communicate.error('Niepoprawna nazwa użytkownika lub hasło.', 'Spróbój ponownie');
        } else {
          console.log(err);
        }
      }
    );
  }
  
  open(content) {
    this.modalService.open(content);
  }
}
