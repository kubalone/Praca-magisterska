import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/shared/model/Customers/customer';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.css']
})
export class CustomerDetailsComponent implements OnInit {

 selectedCustomer:number
  constructor() { }

  ngOnInit() {
    this.selectedCustomer
  }

}
