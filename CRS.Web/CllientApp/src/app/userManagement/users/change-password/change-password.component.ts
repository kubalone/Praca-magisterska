import { Component, OnInit, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'src/app/shared/user.service';
import { ToastrService } from 'ngx-toastr';
import { UsersComponent } from '../users.component';
import { User } from 'src/app/shared/model/user';
import { ChangePasswordService } from 'src/app/shared/change-password.service';
import { FormGroup } from '@angular/forms';

import { FormValidatorService } from 'src/app/shared/validator/form-validator.service';
declare var $: any;
@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  constructor(private service: ChangePasswordService, private modalService: NgbModal, private communicate: ToastrService, private com: UsersComponent, private validator: FormValidatorService, private userService: UserService) { }
  @Input() public user: User;
  currentUser: User;
  ngOnInit() {
    console.log(this.user.id)

  }
  showSpinner=false; 
  onSubmit() {
    this.showSpinner=true;
    const userToUpdate = {
      userName: this.user.userName,
      password: this.service.formModel.value.Passwords.Password
    
    }
    this.service.changePassword(userToUpdate).subscribe((res:any) => {
      if (res.succeeded) {
        this.close();
        this.com.getUsers();
        this.communicate.success('Hasło użytkownika zostało zmienione', 'Operacja przebiegła pomyślnie');
        this.userService.getUserProfile().subscribe(
          res => {
            this.currentUser = res;
            if(this.currentUser.userName === userToUpdate.userName) {
              this.userService.onLogout();
            }
            
          },
          err => {
            console.log(err);
          }
        );
      
      }
      else {
        this.communicate.error("Błąd podczas operacji", "Nie można zmienić hasła")
      }

    },
    err => {
      console.log(err);
    });
   

  }
 
 
  close() {
    this.modalService.dismissAll();
    this.service.formModel.reset();
  }

}


