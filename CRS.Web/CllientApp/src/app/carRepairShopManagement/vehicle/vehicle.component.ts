import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { VehicleService } from 'src/app/shared/vehicle/vehicle.service';
import { Brand } from 'src/app/shared/model/Vehicles/brand';
import { VehicleModel } from 'src/app/shared/model/Vehicles/vehicleModel';
import { Vehicle } from 'src/app/shared/model/Vehicles/vehicle';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.css']
})
export class VehicleComponent implements OnInit {
 

  constructor(private modalService: NgbModal) { }

  ngOnInit() {
  }
  openAddVehicleModal(newVehicle) {
    this.modalService.open(newVehicle);
  }
}
