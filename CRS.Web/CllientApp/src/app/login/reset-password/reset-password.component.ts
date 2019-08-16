import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ChangePasswordService } from 'src/app/shared/user/change-password.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  constructor(private modalService: NgbModal, private service: ChangePasswordService, private communicate: ToastrService) { }
  showSpinner = false;
  ngOnInit() {
  }
  close() {
    this.modalService.dismissAll();
  }
  resetPassword() {
    this.showSpinner = true;
    this.service.resetPasswordForAdmin().subscribe((res:any) =>{
      this.close();
      if(res.value.successful == true) {
        this.communicate.success("Link do resetowania hasła został wysłany", "Sprawdź swoją pocztę");
      } else {
        this.communicate.error("Wystąpił błąd", "Nie można wysłać maila do zresetowania hasła");
      }
    }, 
    err =>{
      console.log(err);
    })
  }
}
