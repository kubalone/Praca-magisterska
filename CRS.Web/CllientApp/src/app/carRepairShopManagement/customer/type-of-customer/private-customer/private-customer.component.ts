import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/shared/model/Customers/customer';
import { CustomerService } from 'src/app/shared/customer/customer.service';

@Component({
  selector: 'app-private-customer',
  templateUrl: './private-customer.component.html',
  styleUrls: ['./private-customer.component.css']
})
export class PrivateCustomerComponent implements OnInit {

  privateCustomers: Customer [];
  showLoading = true;
  showTable = false;
  customersType = "Klienci prywatni"
  showTypeOfCustomer = false;
  showInstitutionName = false;
  constructor(private service: CustomerService) { }

  ngOnInit() {
    this.getPrivateCustomers();
  }
  getPrivateCustomers() {
    this.service.getConcreteCustomers(1).subscribe((res: any) => {
      this.privateCustomers = res;
      this.showLoading= false;
      this.showTable = true;
    });
  }

}
