import { Component, OnInit, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalService } from 'src/app/shared/modal.service';
import { FormValidatorService } from 'src/app/shared/validator/form-validator.service';
import { FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Customer } from 'src/app/shared/model/Customers/customer';
import { CustomerService } from 'src/app/shared/customer/customer.service';
import { TypeOfCustomer } from 'src/app/shared/model/Customers/typeOfCustomer';
declare var $: any;
@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css']
})
export class AddCustomerComponent implements OnInit {

  //do usunięcia
  @Input() public customerToUpdate: Customer;
  typesOfCustomer: TypeOfCustomer[];

  constructor(private service: CustomerService, private modalService: NgbModal, private validator: FormValidatorService, private communicate: ToastrService) { }

  ngOnInit() {
    $(document).ready(function () {
      $('#typeOfClient').on('change', function () {
        this.value == '1' ? $("#collapseInstitutionName").hide() : $("#collapseInstitutionName").show();

      });
    });
    this.service.formModel.valueChanges.subscribe(() => {
      this.validator.logValidationErrors(this.service.formModel, this.service.formErrors, this.service.validationMessages);
    });
 

    //pobieranie typów klientów do listy
    this.service.getTypesOfCustomer().subscribe((res: any) => {
      this.typesOfCustomer = res;
    });
   

    //if do analizy
    if (this.customerToUpdate != null) {
      this.service.formModel.patchValue({
        typeOfCustomerID: this.customerToUpdate.typeOfCustomerID,
        companyName: this.customerToUpdate.companyName,
        name: this.customerToUpdate.name,
        surname: this.customerToUpdate.surname,
        adress: {
          province: this.customerToUpdate.province,
          city: this.customerToUpdate.city,
          zipCode: this.customerToUpdate.zipCode,
          street: this.customerToUpdate.street,
          numberOfBuilding: this.customerToUpdate.numberOfBuilding,
          numberOfApartment: this.customerToUpdate.numberOfApartment,
        },
        contact: {
          email: this.customerToUpdate.email,
          phone: this.customerToUpdate.phone
        }
      });
    }
  }



  onSubmit() {

    //this.newBook.push(this.service.formModel.value);
    //this.service.addCustomer().subscribe((res:any) => {
    //if(res.succeeded) {
    //this.close();
    //this.customerCom.getCustomers();
    //this.communicate.success('Nowy Klient został dodany', 'Operacja zakończona pomyślnie');
    // } else {
    // this.communicate.error('Dodawanie nowego klienta niepowiodło się', 'Spróbój ponownie');
    //}
    //})
  }

  close() {
    this.modalService.dismissAll();
    this.service.formModel.reset();
  }


}
