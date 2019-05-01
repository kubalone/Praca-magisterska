import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  constructor(private service: UserService) { }
  listOfUsers;
  ngOnInit() {
  this.service.getUsers().subscribe(res => {
    res=this.listOfUsers;
    })
  }

}
