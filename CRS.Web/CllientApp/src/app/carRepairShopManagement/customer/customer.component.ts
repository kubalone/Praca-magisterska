import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddCustomerComponent } from './add-customer/add-customer.component';
import { Customer } from 'src/app/shared/model/Customers/customer';
import { CustomerService } from 'src/app/shared/customer/customer.service';
declare var $: any;
@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
 
  constructor(private modalService: NgbModal, private service: CustomerService) { }
  
  ngOnInit() {
  

  }
  openAddCustomerModal(newCustomer) {
    this.modalService.open(newCustomer);
  }
  openEditCustomerModal(item) {
    this.modalService.open(item);
  }
 
}
