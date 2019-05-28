import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/shared/model/Customers/customer';
import { CustomerService } from 'src/app/shared/customer/customer.service';

@Component({
  selector: 'app-busisness-customer',
  templateUrl: './busisness-customer.component.html',
  styleUrls: ['./busisness-customer.component.css']
})
export class BusisnessCustomerComponent implements OnInit {
  busisnessCustomers: Customer [];
  showLoading = true;
  showTable = false;
  customersType = "Klienci firmowi"
  showTypeOfCustomer = false;
  showInstitutionName = true;
  constructor(private service: CustomerService) { }

  ngOnInit() {
    this.getBusisnessCustomers();
  }
  getBusisnessCustomers() {
    this.service.getConcreteCustomers(2).subscribe((res: any) => {
      this.busisnessCustomers = res;
      this.showLoading= false;
      this.showTable = true;
    });
  }

}
