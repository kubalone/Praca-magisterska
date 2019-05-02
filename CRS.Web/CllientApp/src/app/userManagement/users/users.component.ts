import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';
import { User } from 'src/app/shared/model/user';
import { Subject } from 'rxjs';
declare var $: any;
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  constructor(private service: UserService, private chRef: ChangeDetectorRef) { }
  listOfUsers: User[];
  dataTable: any;

  users$: any[] = [];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  ngOnInit() {
    this.dtOptions = {
      info: false,
      language: {
        url: 'https://cdn.datatables.net/plug-ins/1.10.19/i18n/Polish.json'
      },
      pageLength: 5,
      paging: false,
      lengthChange: false,
      searching: false
      
     
    };
  this.service.getUsers().subscribe(res => {
    this.users$ = res;
    this.dtTrigger.next();
   
    });
    
  }
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
}
