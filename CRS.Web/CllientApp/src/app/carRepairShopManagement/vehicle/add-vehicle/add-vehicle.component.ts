import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { VehicleService } from 'src/app/shared/vehicle/vehicle.service';
import { FormValidatorService } from 'src/app/shared/validator/form-validator.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Vehicle } from 'src/app/shared/model/Vehicles/vehicle';
import { Brand } from 'src/app/shared/model/Vehicles/brand';
import { VehicleModel } from 'src/app/shared/model/Vehicles/vehicleModel';

declare var $: any;
@Component({
  selector: 'app-add-vehicle',
  templateUrl: './add-vehicle.component.html',
  styleUrls: ['./add-vehicle.component.css']
})
export class AddVehicleComponent implements OnInit {
  @Input() public vehicle: Vehicle;
  showSpinner = false;
  modalHeader: string;

  year:  Array<String> = [];
  brands:  Brand [];
  models: VehicleModel [];

  constructor(private modalService: NgbModal, private service: VehicleService,private validator: FormValidatorService, private communicate: ToastrService, private router: Router) { }
  getModelForBrand(brandName) {
    
   
    let brand = this.brands.find(x => x.name === brandName);
    this.service.getModel(brand.id).subscribe((res:any) => {
 
    this.models=res;
    $('#model-type').selectpicker('destroy');
    $('#model-type').selectpicker('refresh');
   

    });
    
  }
 
  ngOnInit() {
    $('#year ').selectpicker('refresh');
    this.service.getBrand().subscribe((res:any) => {
  
      this.brands=res;
      $('#select-brand ').selectpicker('refresh');
      $('#model-type').selectpicker('refresh');
    
    
      });


   
    this.yearInitialize();

    this.service.formModel.valueChanges.subscribe(() => {
      this.validatorMessage();
    });

    this.validatorMessage();

    if (this.vehicle) {
      this.editVehicle(this.vehicle);
      this.modalHeader = "Edytuj parametry pojazdu"
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
 showInput(id){
   var inputId=$('input'+id+'');
   var spanId=$('span'+id+'');
   inputId.hasClass('d-none')? inputId.removeClass('d-none'): inputId.addClass('d-none');
   spanId.hasClass('d-none')? spanId.removeClass('d-none'): spanId.addClass('d-none');
 }
 getConcreteModel(id: number) {
   this.service.getModel(id).subscribe((res:any) => {
     this.models = res;
   })
 }
  
  yearInitialize() {
    
    for (let i = 1900; i <=2020; i++) {
       this.year.push(i.toString());
    }
  }
  onSubmit() {
    this.showSpinner = true;
    this.mapFormValuesToVehicleModel();
    if (this.vehicle.id == 0) {
      this.service.addVehicle(this.vehicle).subscribe(() => {
        //this.redirectTo('klienci/wszyscy-klienci');
        this.close();
        this.communicate.success('Nowy pojazd został dodany', 'Operacja zakończona pomyślnie');
      },
        err => {
          this.showSpinner = false;
          this.communicate.error('Dodawanie nowego pojazdu niepowiodło się', 'Spróbój ponownie');
          console.log(err);
        });
    } else {
    
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
   
    //this.service.formModel.reset();
    this.modalService.dismissAll();
        
    
//$('.selectpicker').selectpicker('refresh');
  }
  
  //for (cpnst i = 1900; i <= 2020; i++) {
    
   // this.year=[i];
  //}
}
