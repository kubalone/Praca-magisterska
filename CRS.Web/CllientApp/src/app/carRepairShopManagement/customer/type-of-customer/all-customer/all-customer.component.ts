import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/shared/customer/customer.service';
import { Customer } from 'src/app/shared/model/Customers/customer';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-all-customer',
  templateUrl: './all-customer.component.html',
  styleUrls: ['./all-customer.component.css']
})
export class AllCustomerComponent implements OnInit {

  constructor(private service: CustomerService) { }
  customers: Customer [];
  showLoading = true;
  showTable = false;
  showTypeOfCustomer = true;
  customersType = "Wszyscy klienci";
  ngOnInit() { 
   this.getAllCustomers();
   
  }
  getAllCustomers() {
    this.service.getCustomers().subscribe((res: any) => {
      this.customers = res;
      this.showLoading= false;
      this.showTable = true;
    });
  }
}
