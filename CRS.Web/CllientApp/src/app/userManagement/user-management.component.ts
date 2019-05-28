import { Component, OnInit, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { UserService } from 'src/app/shared/user/user.service';
import { User } from 'src/app/shared/model/user';
import { Subject } from 'rxjs';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { ModalService } from 'src/app/shared/modal.service';
import { ToastrService } from 'ngx-toastr';
declare var $: any;
@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {
  constructor(private service: UserService, private modalService: NgbModal, private communicate: ToastrService) { }

  dataTable: any;

  users: User[];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  showLoading: boolean = true;
  showTable: boolean = false;



  ngOnInit() {
    this.dtOptions = {
      info: false,
      language: {
   
        lengthMenu:"Pokaż _MENU_ ",
        search: "Wyszukaj",
        infoEmpty: "Brak wyników",
        //paginate: {
          //first: "pierwszy",
          //last: "następny",
          //previous: "<<",
          //next: ">>"
        //}
        
      },
      //lengthMenu: [ 5, 10, 15, 20, 30,40 ],
     // pageLength: 5,
      paging: false,
     //lengthChange: false,
      //searching: false,
      dom: '<lf<t>ip>' 
    };
   
    this.getUsers();
    
  }
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
  
  getUsers() {

    this.service.getUsers().subscribe(res => {
      this.users = res;
      this.showLoading= false;
      this.showTable = true;
      } );
  }
  close() {
    this.modalService.dismissAll();
  }
  openRegisterModal(content) {
    this.modalService.open(content);
  }
  confirmDeleteModal(content) {
    this.modalService.open(content);
  }
  changePasswordModal(content) {
    this.modalService.open(content);
  } 

}
