import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  constructor(public service: UserService, private communicate: ToastrService) { }

  ngOnInit() {
  }
  onSubmit() {
    this.service.registerNewUser().subscribe((form: any) => {
      if (form.succeeded) {
        this.service.formModel.reset();
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

}
