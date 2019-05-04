import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';
import { User } from 'src/app/shared/model/user';
import { Subject } from 'rxjs';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { RegisterService } from 'src/app/shared/register.service';
import { ModalService } from 'src/app/shared/modal.service';
declare var $: any;
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  constructor(private service: UserService, private modalService: ModalService,   private changeDetectorRefs: ChangeDetectorRef ) { }

  dataTable: any;

  users$: any[] = [];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  showLoading: boolean = true;
  showTable: boolean = false;
  ngOnInit() {
    this.dtOptions = {
      info: false,
      language: {
        url: 'https://cdn.datatables.net/plug-ins/1.10.19/i18n/Polish.json'
      },
      pageLength: 5,
      paging: false,
      lengthChange: false,
      searching: false,
    };
   
    this.getUsers();
    
  }
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
  open(content) {
  
    this.modalService.open(content);
  }
  getUsers() {
    this.service.getUsers().subscribe(res => {
      this.users$ = res;
      this.showLoading = false;
      this.showTable=true;
      });
  }
  close() {
    this.modalService.close();
  }
  deleteUser(id:string) {
    this.service.deleteUser(id);
    this.getUsers();
  }
  
}
