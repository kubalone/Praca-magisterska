import { Component, OnInit, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { VehicleService } from 'src/app/shared/vehicle/vehicle.service';
import { FormValidatorService } from 'src/app/shared/validator/form-validator.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-vehicle',
  templateUrl: './add-vehicle.component.html',
  styleUrls: ['./add-vehicle.component.css']
})
export class AddVehicleComponent implements OnInit {
  @Input() public vehicle: Vehicle;
  showSpinner = false;
  modalHeader: string;
  constructor(private modalService: NgbModal, private service: VehicleService,private validator: FormValidatorService, private communicate: ToastrService, private router: Router) { }

  ngOnInit() {
    
    this.service.formModel.valueChanges.subscribe(() => {
      this.validatorMessage();
    });

    this.validatorMessage();

    if (this.vehicle) {
      this.editVehicle(this.vehicle);
      this.modalHeader = "Edytuj dane klienta"
    } else {
      this.vehicle = {
        id: 0,
        typeOfvehicleID: null,
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
      this.modalHeader = "Dodaj nowy pojazd"
    }
  }
  onSubmit() {
    this.showSpinner = true;
    this.mapFormValuesToVehicleModel();
    if (this.customer.id == 0) {
      this.service.addCustomer(this.customer).subscribe(() => {
        //this.redirectTo('klienci/wszyscy-klienci');
        this.close();
        this.communicate.success('Nowy Klient został dodany', 'Operacja zakończona pomyślnie');
      },
        err => {
          this.showSpinner = false;
          this.communicate.error('Dodawanie nowego klienta niepowiodło się', 'Spróbój ponownie');
          console.log(err);
        });
    } else {
    
      this.service.updateCustomer(this.customer).subscribe(() => {
        this.close();
        this.redirectTo(this.router.url);
        this.communicate.success('Dane klienta zostały zaktualizowane', 'Operacja zakończona pomyślnie');
      },
        err => {
          this.showSpinner = false;
          this.communicate.error('Aktualizacja klienta nie powiodła się', 'Spróbój ponownie');
          console.log(err);
        });
    }
  }
  mapFormValuesToVehicleModel() {
    this.vehicle.typeOfvehicleID = this.service.formModel.value.typeOfvehicleID;
    this.vehicle.companyName = this.service.formModel.value.companyName;
    this.vehicle.name = this.service.formModel.value.name;
    this.vehicle.surname = this.service.formModel.value.surname;
    this.vehicle.province = this.service.formModel.value.adress.province;
    this.vehicle.city = this.service.formModel.value.adress.city;
    this.vehicle.zipCode = this.service.formModel.value.adress.zipCode;
    this.vehicle.street = this.service.formModel.value.adress.street;
    this.vehicle.numberOfBuilding = this.service.formModel.value.adress.numberOfBuilding;
    this.vehicle.numberOfApartment = this.service.formModel.value.adress.numberOfApartment;
    this.vehicle.email = this.service.formModel.value.contact.email
    this.vehicle.phone = this.service.formModel.value.contact.phone
  }
  editVehicle(customer: Customer) {
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
  close() {
    this.service.formModel.reset();
    this.modalService.dismissAll();
  }
}
