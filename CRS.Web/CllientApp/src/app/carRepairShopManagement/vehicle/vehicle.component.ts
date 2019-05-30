import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

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
