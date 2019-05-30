import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/shared/model/Customers/customer';
import { Router, ActivatedRoute } from '@angular/router';
import { CustomerService } from 'src/app/shared/customer/customer.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.css']
})
export class CustomerDetailsComponent implements OnInit {

  customer: Customer;
  typeOfClient: string;
  fieldName: string;
  fullName: string;  

  constructor(private route: ActivatedRoute, private service: CustomerService, private modalService: NgbModal) { }

  ngOnInit() {
   this.route.paramMap.subscribe(param => {
     const id = +param.get('id');
     this.getCustomerById(id);

   });
   
  }
  getCustomerById(id: number) {
    this.service.getCustomer(id).subscribe(res =>{
      this.customer = res;
   
    });
  }
  getTypeOfClient(id){

    id == 1 ? this.typeOfClient= "Osoba prywatna": this.typeOfClient="Przedsiębiorca"
    return this.typeOfClient;
  }
  checkIsNull(item)
  {
    item == '' ? this.fieldName = "Nie podano" : this.fieldName = item;
    return this.fieldName;
  }
  openEditModal(content) {
    this.modalService.open(content);
  }
}
