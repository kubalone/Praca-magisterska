import { Component, OnInit, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'src/app/shared/user/user.service';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/shared/model/user';
import { ChangePasswordService } from 'src/app/shared/user/change-password.service';
import { FormGroup } from '@angular/forms';

import { FormValidatorService } from 'src/app/shared/validator/form-validator.service';
import { UserManagementComponent } from '../user-management.component';
declare var $: any;

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  constructor(private service: ChangePasswordService, private modalService: NgbModal, private communicate: ToastrService, private com: UserManagementComponent, private validator: FormValidatorService, private userService: UserService) { }
  @Input() public user: User;
  currentUser;
  userName: string;
  ngOnInit() {
  

  }
  showSpinner = false;
  onSubmit() {
    this.showSpinner = true;
    const userToUpdate = {
      userName: this.user.userName,
      password: this.service.formModel.value.Passwords.Password

    }
    this.service.changePassword(userToUpdate).subscribe((res: any) => {

      this.close();
      this.com.getUsers();
      this.communicate.success('Hasło użytkownika zostało zmienione', 'Operacja przebiegła pomyślnie');
      this.userService.getUserProfile().subscribe(
        (res:any) => {
          this.currentUser = res;
          if (this.currentUser.userName === userToUpdate.userName) {
            this.userService.onLogout();
          }

        },
        err => {
          console.log(err);
        }
      );
    },
      err => {
        this.communicate.error("Błąd podczas operacji", "Nie można zmienić hasła")
        console.log(err);
      });


  }


  close() {
    this.modalService.dismissAll();
    this.service.formModel.reset();
  }

}
