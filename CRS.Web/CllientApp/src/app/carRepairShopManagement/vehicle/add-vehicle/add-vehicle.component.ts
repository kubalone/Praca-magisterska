import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { VehicleService } from 'src/app/shared/vehicle/vehicle.service';
import { FormValidatorService } from 'src/app/shared/validator/form-validator.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Vehicle } from 'src/app/shared/model/Vehicles/vehicle';
import { Brand } from 'src/app/shared/model/Vehicles/brand';
import { VehicleModel } from 'src/app/shared/model/Vehicles/vehicleModel';
import { Fuel } from 'src/app/shared/model/Vehicles/fuel';
import { Customer } from 'src/app/shared/model/Customers/customer';
import { OrderService } from 'src/app/shared/order/order.service';


declare var $: any;
@Component({
  selector: 'app-add-vehicle',
  templateUrl: './add-vehicle.component.html',
  styleUrls: ['./add-vehicle.component.css']
})
export class AddVehicleComponent implements OnInit {
  @Input() public vehicle: Vehicle;
  @Input() public addVehicleInAddOrderView: boolean;
  @Input() public customer: Customer;
  showSpinner = false;
  modalHeader: string;

  year: Array<String> = [];
  brands: Brand[];
  models: VehicleModel[];
  typesOfFuel: Fuel[] = [
    { typeOfFuel: "Benzyna" },
    { typeOfFuel: "Ropa" },
    { typeOfFuel: "Gaz" },
    { typeOfFuel: "Inne" },

  ];

  constructor(private orderService: OrderService, private modalService: NgbModal, private service: VehicleService, private validator: FormValidatorService, private communicate: ToastrService, private router: Router) { }
  getModelForBrand(brandName) {

    let brand = this.brands.find(x => x.name === brandName);

    this.service.getModel(brand.id).subscribe((res: any) => {

      this.models = res;
    });

  }

  ngOnInit() {
    console.log(this.addVehicleInAddOrderView);
    this.service.getBrand().subscribe((res: any) => {
      this.brands = res;
    });

    this.yearInitialize();

    this.service.formModel.valueChanges.subscribe(() => {
      this.validatorMessage();
    });

    this.validatorMessage();

    if (this.vehicle) {

      this.editVehicle(this.vehicle);
      this.modalHeader = "Edytuj parametry pojazdu";

      this.service.getBrand().subscribe((res: any) => {
        this.brands = res;
        var brandContains = this.brands.find(p => p.name === this.vehicle.brand);
        if (brandContains != null) { 
          this.getModelForBrand(this.vehicle.brand);
        } else { 
          this.showEditInput('#brand', '#select-brand', this.vehicle.brand);
          this.showEditInput('#model', '#model-type', this.vehicle.model);
        }
        var yearContains = this.year.find(p => p === this.vehicle.modelYear);     
        if(!yearContains) {          
          this.showEditInput('#modelYear', '#year', this.vehicle.modelYear);
        }

      });
    } else {
      this.vehicle = {
        id: 0,
        modelYear: '',
        brand: '',
        model: '',
        registration: '',
        vin: '',
        colour: '',
        fuel: '',
        mileAge: '',
        power: '',
        displacementCapacity: ''

      }
      this.modalHeader = "Dodaj nowy pojazd"
    }
  }

  showInput(id: string, selectId: string) {

    $(selectId).val('');
   
    var inputId = $('input' + id + '');
    $(inputId).val('');

    var spanId = $('span' + id + '');
    inputId.hasClass('d-none') ? inputId.removeClass('d-none') : inputId.addClass('d-none');
    spanId.hasClass('d-none') ? spanId.removeClass('d-none') : spanId.addClass('d-none');
  }
  
  showEditInput(id: string, selectId: string, inputValue: string) {

    $(selectId).val('');
   
    var inputId = $('input' + id + '');
    $(inputId).val(inputValue);

    var spanId = $('span' + id + '');
    inputId.hasClass('d-none') ? inputId.removeClass('d-none') : inputId.addClass('d-none');
    spanId.hasClass('d-none') ? spanId.removeClass('d-none') : spanId.addClass('d-none');
  }
  getConcreteModel(id: number) {
    this.service.getModel(id).subscribe((res: any) => {
      this.models = res;
    })
  }

  yearInitialize() {

    for (let i = 2020; i >= 1950; i--) {
      this.year.push(i.toString());
    }
  }
  onSubmit() {
    this.showSpinner = true;
    this.mapFormValuesToVehicleModel();
    if (this.vehicle.id == 0 && this.addVehicleInAddOrderView ==false) {
      this.service.addVehicle(this.vehicle).subscribe(() => {

        this.close();
        this.communicate.success('Nowy pojazd został dodany', 'Operacja zakończona pomyślnie');
      },
        err => {
          this.showSpinner = false;
          this.communicate.error('Dodawanie nowego pojazdu niepowiodło się', 'Spróbój ponownie');
          console.log(err);
        });
    }
    if(this.vehicle.id==0&&this.addVehicleInAddOrderView == true) {//dodawanie z widoku zlecenia
      console.log('add-vehicle z widoku dodawania')
      this.vehicle.customerID=this.customer.id;
      console.log(this.vehicle);
      this.service.addVehicle(this.vehicle).subscribe(() => {
        this.orderService.setCustomer(this.customer);
        this.close();
        this.communicate.success('Nowy pojazd został dodany', 'Operacja zakończona pomyślnie');
      },
        err => {
          this.showSpinner = false;
          this.communicate.error('Dodawanie nowego pojazdu niepowiodło się', 'Spróbój ponownie');
          console.log(err);
        });
    } 

    if(this.vehicle.id!=0&&this.addVehicleInAddOrderView == false) {
      console.log("update");
      this.service.updateVehicle(this.vehicle).subscribe(() => {
        this.close();
        this.redirectTo(this.router.url);
        this.communicate.success('Parametry pojazdu zostały zaktualizowane', 'Operacja zakończona pomyślnie');
      },
        err => {
          this.showSpinner = false;
          this.communicate.error('Aktualizacja pojazdu nie powiodła się', 'Spróbój ponownie');
          console.log(err);
        });
    }
  }

  mapFormValuesToVehicleModel() {
    this.vehicle.modelYear = this.service.formModel.value.modelYear;
    this.vehicle.brand = this.service.formModel.value.brand;
    this.vehicle.model = this.service.formModel.value.model;
    this.vehicle.registration = this.service.formModel.value.registration;
    this.vehicle.colour = this.service.formModel.value.colour;
    this.vehicle.vin = this.service.formModel.value.vin;
    this.vehicle.fuel = this.service.formModel.value.fuel;
    this.vehicle.mileAge = this.service.formModel.value.mileAge;
    this.vehicle.power = this.service.formModel.value.power;
    this.vehicle.displacementCapacity = this.service.formModel.value.displacementCapacity;
  }
  editVehicle(vehicle: Vehicle) {

    this.service.formModel.patchValue({
      modelYear: vehicle.modelYear,
      brand: vehicle.brand,
      model: vehicle.model,
      registration: vehicle.registration,
      colour: vehicle.colour,
      vin: vehicle.vin,
      fuel: vehicle.fuel,
      mileAge: vehicle.mileAge,
      power: vehicle.power,
      displacementCapacity: vehicle.displacementCapacity,
    });
  }

  validatorMessage() {
    this.validator.logValidationErrors(this.service.formModel, this.service.formErrors, this.service.validationMessages)
  }
  redirectTo(uri) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate([uri]));
  }
  close() {



    this.service.formModel.reset();
    this.modalService.dismissAll();

   // this.redirectTo(this.router.url);
  }
}
