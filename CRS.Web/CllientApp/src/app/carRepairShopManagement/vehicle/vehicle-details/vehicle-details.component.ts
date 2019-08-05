import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { VehicleService } from 'src/app/shared/vehicle/vehicle.service';
import { Vehicle } from 'src/app/shared/model/Vehicles/vehicle';
import { CustomerService } from 'src/app/shared/customer/customer.service';

@Component({
  selector: 'app-vehicle-details',
  templateUrl: './vehicle-details.component.html',
  styleUrls: ['./vehicle-details.component.css']
})
export class VehicleDetailsComponent implements OnInit {
  vehicle: Vehicle;
  fieldName: string;
  customer;
  constructor(private route: ActivatedRoute, private router: Router, private service: VehicleService, private modalService: NgbModal, private serviceCustomer: CustomerService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(param => {
      const id = +param.get('id');
      this.getVehicleById(id);
 
    });
  }
  getVehicleById(id: number) {
    this.service.getVehicle(id).subscribe(res =>{
      this.vehicle = res;
      this.serviceCustomer.getCustomer(this.vehicle.customerID).subscribe(cus => {
        this.customer=cus;
      })
   
    });
  }
  openEditModal(content) {
    this.modalService.open(content);
  }
  viewCustomer(id:number){
    console.log(id);
    this.router.navigate(['klienci/informacje', id])
  } 
  checkIsNull(item)
  {
    item == '' ? this.fieldName = "Nie podano" : this.fieldName = item;
    return this.fieldName;
  }
}
