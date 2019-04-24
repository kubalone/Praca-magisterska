import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private service: UserService, private communicate: ToastrService) { }
  formModel = {
    UserName: '',
    Password: ''
  }
  ngOnInit() {
  }
  onSubmit(form: NgForm) {

  }
}
