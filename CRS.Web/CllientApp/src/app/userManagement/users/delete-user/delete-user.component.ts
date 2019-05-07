import { Component, OnInit, Input } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { UsersComponent } from '../users.component';
import { User } from 'src/app/shared/model/user';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.css']
})
export class DeleteUserComponent implements OnInit {
  constructor(private service: UserService, private modalService: NgbModal, private communicate: ToastrService, private com: UsersComponent) { }
  @Input() public userToDelete: User;
  userName: string;
  ngOnInit() {
    this.userName = this.userToDelete.userName.toLocaleUpperCase();
  }
  showSpinner=false;
  deleteUserConfirmation(id: string) {
    this.showSpinner = true;
    this.service.deleteUser(id).subscribe((res:any) => {
      if (res.succeeded) {
        this.close();
        this.com.getUsers();
        this.communicate.success('Użytkownik został usunięty', 'Operacja przebiegła pomyślnie');
      }
      else {
        this.communicate.error("Błąd podczas usuwania użytkownika", "Nie można usunąć użytkownika")
      }

    },
    err => {
      console.log(err);
    });
  }
  close() {
    this.modalService.dismissAll();
  }



}
