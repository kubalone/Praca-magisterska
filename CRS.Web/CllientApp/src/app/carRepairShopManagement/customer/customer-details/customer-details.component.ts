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
  showCustomerDetails = false;
  showLoading=true;
  dtOptions: DataTables.Settings = {};
  header="Naprawy"

  constructor(private route: ActivatedRoute, private service: CustomerService, private modalService: NgbModal, private router: Router) { }

  ngOnInit() {
    this.datatableSettings();
   this.route.paramMap.subscribe(param => {
     const id = +param.get('id');
     this.getCustomerById(id);
     

   });
   
  }
  getCustomerById(id: number) {
    this.service.getCustomer(id).subscribe(res =>{
      this.customer = res;
      this.showCustomerDetails = true;
      this.showLoading=false;
 
   
    });
  }
  datatableSettings() {
    this.dtOptions = {
      info: false,
      ordering:false,
      language: {
        lengthMenu:"Pokaż _MENU_ ",
        search: "Wyszukaj",
        infoEmpty: "Brak wyników",
        emptyTable: "Brak danych",
        paginate: {
          first: "pierwszy",
          last: "następny",
          previous: "<<",
          next: ">>"
        }
        
      },
      lengthMenu: [ 5, 10, 15, 20, 30,40 ],
      pageLength: 20,
      //paging: false,
     //lengthChange: false,
      //searching: false,
      dom: '<lf<t>ip>' 
    };
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
  viewVehicle(id:number) {
    this.router.navigate(['pojazdy/informacje', id])
  }
}
