import { Component, OnInit, ViewChild, Output } from '@angular/core';

import { ToastrService } from 'ngx-toastr';

import { FormValidatorService } from 'src/app/shared/validator/form-validator.service';
import { UserManagementComponent } from '../user-management.component';
import { RegisterService } from 'src/app/shared/user/register.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  constructor(public service: RegisterService, private communicate: ToastrService, private com: UserManagementComponent,  private validator: FormValidatorService, private modalService: NgbModal) { }

  showSpinner = false;
  ngOnInit() {
  
  }
  onSubmit() {
    this.showSpinner = true;
    this.service.registerNewUser().subscribe((form: any) => {
      if (form.succeeded) {
        this.close();
       // this.service.formModel.reset();
        this.com.getUsers();
        this.communicate.success('Nowy użytkownik został dodany', 'Rejestracja zakończona');
      } else {
      
        this.showSpinner = false;
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
   this.modalService.dismissAll();
   this.service.formModel.reset();
  }
  
}
