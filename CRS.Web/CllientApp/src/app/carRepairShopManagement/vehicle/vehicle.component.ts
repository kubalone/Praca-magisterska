import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { VehicleService } from 'src/app/shared/vehicle/vehicle.service';
import { Brand } from 'src/app/shared/model/Vehicles/brand';
import { VehicleModel } from 'src/app/shared/model/Vehicles/vehicleModel';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.css']
})
export class VehicleComponent implements OnInit {
  brands:  Brand [];
  models: VehicleModel [];
  constructor(private modalService: NgbModal,  private service: VehicleService) { }

  ngOnInit() {
    this.service.getBrand().subscribe((res:any) => {
  
      this.brands=res;
      
     
      
     
      });
  }
  getModelForBrand(brandName) {
    let brand = this.brands.find(x => x.name === brandName);
    this.service.getModel(brand.id).subscribe((res:any) => {
    this.models=res;
  //  $('select').selectpicker();
    });
 
  }
  openAddVehicleModal(newVehicle) {
    this.modalService.open(newVehicle);
  }
}
