import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { VehicleService } from 'src/app/shared/vehicle/vehicle.service';
import { Vehicle } from 'src/app/shared/model/Vehicles/vehicle';

@Component({
  selector: 'app-vehicle-details',
  templateUrl: './vehicle-details.component.html',
  styleUrls: ['./vehicle-details.component.css']
})
export class VehicleDetailsComponent implements OnInit {
  vehicle: Vehicle;
  fieldName: string;
  constructor(private route: ActivatedRoute, private service: VehicleService, private modalService: NgbModal) { }

  ngOnInit() {
    this.route.paramMap.subscribe(param => {
      const id = +param.get('id');
      this.getVehicleById(id);
 
    });
  }
  getVehicleById(id: number) {
    this.service.getVehicle(id).subscribe(res =>{
      this.vehicle = res;
   
    });
  }
  openEditModal(content) {
    this.modalService.open(content);
  }
  checkIsNull(item)
  {
    item == '' ? this.fieldName = "Nie podano" : this.fieldName = item;
    return this.fieldName;
  }
}
