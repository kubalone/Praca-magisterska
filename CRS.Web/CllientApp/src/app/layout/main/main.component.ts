import { LoginService } from '../../shared/user/login.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/user/user.service';
declare var $: any;
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  user;
  title = 'KlientApp';
  userRole: boolean;
  constructor(private router: Router, private service: UserService){}
  ngOnInit(): void {
    this.service.getUserProfile().subscribe(
      res => {
        this.user = res;
       
      },
      err => {
        
        console.log(err);
      }
    );
    this.userRole = this.service.getUserRole() === 'Admin';
  }


  onLogout() {
   this.service.onLogout();
  }




}
