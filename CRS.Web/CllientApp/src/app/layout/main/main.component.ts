import { LoginService } from './../../shared/login.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
declare var $: any;
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  user;
  title = 'KlientApp';
  constructor(private router: Router, private service: LoginService){}
  ngOnInit(): void {
    this.service.getUserProfile().subscribe(
      res => {
        this.user = res;
       // console.log(this.user.userName);
      },
      err => {
        console.log(err);
      }
    );

  }


  onLogout() {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/login');
  }




}
