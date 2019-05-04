import { Component, OnInit, ViewChild, Output } from '@angular/core';

import { ToastrService } from 'ngx-toastr';
import { RegisterService } from 'src/app/shared/register.service';
import { NgForm } from '@angular/forms';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { UsersComponent } from '../users.component';
import { EventEmitter } from 'protractor';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  closeResult: string;
  constructor(public service: RegisterService, private communicate: ToastrService, private com: UsersComponent) { }
  private modalService: NgbModal
  str: string ="service.formModel.get('UserName').touched && service.formModel.get('UserName').errors?.required";
 
 
  ngOnInit() {
    
  }
  onSubmit() {
    this.service.registerNewUser().subscribe((form: any) => {
      if (form.succeeded) {
        this.service.formModel.reset();
        this.com.close();
        this.com.getUsers();
        this.communicate.success('Nowy użytkownik został dodany', 'Rejestracja zakończona');
      } else {
        form.errors.forEach(element => {
          switch(element.code) {
            case 'DuplicateUserName':
            this.communicate.error('Nazwa użytkownika jest w użyciu', 'Podaj inną nazwę');
            break;
            default:
            this.communicate.error(element.description, 'Registration failed');
            break;
          }
        });
      }
    },
    err => {
      console.log(err);
    });
   
  }
 


  close() {
   this.com.close();
   this.service.formModel.reset();
  }
  
}
