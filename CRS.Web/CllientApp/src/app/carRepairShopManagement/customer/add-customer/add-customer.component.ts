import { Component, OnInit, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalService } from 'src/app/shared/modal.service';
import { FormValidatorService } from 'src/app/shared/validator/form-validator.service';
import { FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Customer } from 'src/app/shared/model/Customers/customer';
import { CustomerService } from 'src/app/shared/customer/customer.service';
import { TypeOfCustomer } from 'src/app/shared/model/Customers/typeOfCustomer';
import { AllCustomerComponent } from '../type-of-customer/all-customer/all-customer.component';
import { Router, RouterModule } from '@angular/router';
declare var $: any;
@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css']
})
export class AddCustomerComponent implements OnInit {

  //do usunięcia
  @Input() public customer: Customer;
  typesOfCustomer: TypeOfCustomer[];
  showSpinner = false
  constructor(private service: CustomerService, private modalService: NgbModal, private validator: FormValidatorService, private communicate: ToastrService, private router: Router) { }

  ngOnInit() {
    $(document).ready(function () {
      $('#typeOfClient').on('change', function () {
        this.value == '1' ? $("#collapseInstitutionName").hide() : $("#collapseInstitutionName").show();
      });
    });
    this.service.formModel.valueChanges.subscribe(() => {
      this.validatorMessage();
    });
    this.validatorMessage();

    if (this.customer) {
      console.log('not null')
      //this.getEmployee(customerId);
    } else {
      this.customer = {
        id: 0,
        typeOfCustomerID: null,
        companyName: '',
        name: '',
        surname: '',
        province: '',
        city: '',
        zipCode: '',
        street: '',
        numberOfBuilding: '',
        numberOfApartment: '',
        email: '',
        phone: ''
      }
    }

    //pobieranie typów klientów do listy
    this.service.getTypesOfCustomer().subscribe((res: any) => {
      this.typesOfCustomer = res;
    });

  }
  mapFormValuesToCustomerModel() {
    this.customer.typeOfCustomerID = this.service.formModel.value.typeOfCustomerID;
    this.customer.companyName = this.service.formModel.value.companyName;
    this.customer.name = this.service.formModel.value.name;
    this.customer.surname = this.service.formModel.value.surname;
    this.customer.province = this.service.formModel.value.adress.province;
    this.customer.city = this.service.formModel.value.adress.city;
    this.customer.zipCode = this.service.formModel.value.adress.zipCode;
    this.customer.street = this.service.formModel.value.adress.street;
    this.customer.numberOfBuilding = this.service.formModel.value.adress.numberOfBuilding;
    this.customer.numberOfApartment = this.service.formModel.value.adress.numberOfApartment;
    this.customer.email = this.service.formModel.value.contact.email
    this.customer.phone = this.service.formModel.value.contact.phone
  }

  validatorMessage() {
    this.validator.logValidationErrors(this.service.formModel, this.service.formErrors, this.service.validationMessages)
  }

  onSubmit() {
    this.showSpinner = true;
    this.mapFormValuesToCustomerModel();
    this.service.addCustomer(this.customer).subscribe(() => {

 
  
        this.redirectTo('klienci/wszyscy-klienci');
       
      this.close();
      this.communicate.success('Nowy Klient został dodany', 'Operacja zakończona pomyślnie');


    },
      err => {
        this.showSpinner = false;
        this.communicate.error('Dodawanie nowego klienta niepowiodło się', 'Spróbój ponownie');
        console.log(err);
      });


  }
  redirectTo(uri) {
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
    this.router.navigate([uri]));
  }
  close() {
    this.service.formModel.reset();
    this.modalService.dismissAll();
  }
}
