import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
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
import { AddJobComponent } from '../../add-job/add-job.component';
import { OrderService } from 'src/app/shared/order/order.service';
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
  showSpinner = false;
  modalHeader: string;
  @Input() addClientInAddOrderView =false;
  @Input() editClientInAddOrderView = false;
 
  customerTest: Customer;
  
  constructor(private tests:OrderService, private service: CustomerService, private modalService: NgbModal, private validator: FormValidatorService, private communicate: ToastrService, private router: Router) { }
  message:string;
  ngOnInit() {
  // this.tests.currentCustomer.subscribe(customer => this.customerTest = customer)
   
      
    $(document).ready(function () {
      $('#typeOfClient').on('change', function () {
        if(this.value == '1') {
          $("#collapseInstitutionName").hide()
          $("#institution").val("");
        } else {
          $("#collapseInstitutionName").show()
        }
        this.value == '1' ? $("#collapseInstitutionName").hide() : $("#collapseInstitutionName").show() ;
      });   
    });

    if(this.customer){
      var value = this.customer.typeOfCustomerID;
      value == 1 ? $("#collapseInstitutionName").hide() :$("#collapseInstitutionName").show();
    }
 
    this.service.formModel.valueChanges.subscribe(() => {
      this.validatorMessage();
    });

    this.validatorMessage();

    if (this.customer) {
      this.editCustomer(this.customer);
      this.modalHeader = "Edytuj dane klienta"
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
        phone: '',
        vehicles:null
      }
      this.modalHeader = "Dodaj nowego klienta"
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

  editCustomer(customer: Customer) {
    this.service.formModel.patchValue({
      typeOfCustomerID: customer.typeOfCustomerID,
      companyName: customer.companyName,
      name: customer.name,
      surname: customer.surname,
      adress: {
        province: customer.province,
        city: customer.city,
        zipCode: customer.zipCode,
        street: customer.street,
        numberOfBuilding: customer.numberOfBuilding,
        numberOfApartment: customer.numberOfApartment
      },
      contact: {
        email: customer.email,
        phone: customer.phone
      }
    });
  }

  validatorMessage() {
    this.validator.logValidationErrors(this.service.formModel, this.service.formErrors, this.service.validationMessages)
  }
  @Output() titleChanged = new EventEmitter<string>();
  onSubmit() {
    this.showSpinner = true;
    this.mapFormValuesToCustomerModel();
    if (this.customer.id == 0 && this.addClientInAddOrderView == false) {
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
    if(this.customer.id != 0 && this.addClientInAddOrderView == false && this.editClientInAddOrderView ==false) {
    
      this.service.updateCustomer(this.customer).subscribe(() => {
        this.redirectTo(this.router.url);
        this.close();
        
        this.communicate.success('Dane klienta zostały zaktualizowane', 'Operacja zakończona pomyślnie');
      },
        err => {
          this.showSpinner = false;
          this.communicate.error('Aktualizacja klienta nie powiodła się', 'Spróbój ponownie');
          console.log(err);
        });
    }

    if(this.customer.id == 0 && this.addClientInAddOrderView ==true) {
      this.service.addCustomer(this.customer).subscribe((id:number) => {
        this.customer.id=id;
        this.close();
        this.tests.setCustomer( this.customer);
        
        this.communicate.success('Nowy Klient został dodany', 'Operacja zakończona pomyślnie');
      },
        err => {
          this.showSpinner = false;
          this.communicate.error('Dodawanie nowego klienta niepowiodło się', 'Spróbój ponownie');
          console.log(err);
        });
    } 
    if(this.customer.id!=0 && this.editClientInAddOrderView == true) {
      this.service.updateCustomer(this.customer).subscribe(() => {
        this.close();
        this.customerTest = this.customer;
        this.tests.setCustomer(this.customerTest);
        this.communicate.success('Dane klienta zostały zaktualizowane', 'Operacja zakończona pomyślnie');
      },
        err => {
          this.showSpinner = false;
          this.communicate.error('Aktualizacja klienta nie powiodła się', 'Spróbój ponownie');
          console.log(err);
        });
    }



  }
  redirectTo(uri) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate([uri]));
  }
  close() {
    this.service.formModel.reset();
    this.modalService.dismissAll();
  }
}
