import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/shared/order/order.service';
import { clientDetails } from 'src/app/shared/model/order/clientDetails';
import { VehicleService } from 'src/app/shared/vehicle/vehicle.service';
import { iif } from 'rxjs';
import { ignoreElements } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
import { Customer } from 'src/app/shared/model/Customers/customer';

@Component({
  selector: 'app-add-job',
  templateUrl: './add-job.component.html',
  styleUrls: ['./add-job.component.css']
})
export class AddJobComponent implements OnInit {

  constructor(private orderService: OrderService, private countryService:VehicleService, private modalService: NgbModal, private routes: ActivatedRoute) { }
  clienVehicles: clientDetails[];
  customer: Customer;
  
  customerTest: Customer;
  ngOnInit() {
    
    this.orderService.currentCustomer.subscribe(customer => {
       this.customer = customer ;
       if(this.customer.name !=null) {
        this.showClientData=true;
       }
      
    });
   

  }

    showClientData :boolean =false;
    filteredCustomersSingle: any[];

   // filteredCountriesMultiple: any[];



    
    show = false;

    brand: string;
    filterCustomerSingle(event) {
      this.showClientData=false;
      let query = event.query;
      this.orderService.getCustomersWithVehicles().subscribe((customers:any) => {
          this.filteredCustomersSingle = this.filterCustomer(query, customers); 
          if(this.filteredCustomersSingle.length<=0) {
           this.show = true;
           
         //  this.filteredCustomersSingle.push('dsds');
          }    
      
          
     
      });   
  }
  openEditModal(content) {
    this.modalService.open(content);
  }

  filterCustomer(query, customers: any[]):any[] {
    //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
    let filtered : any[] = [];
    
    for(let i = 0; i < customers.length; i++) {
        let customer = customers[i];
        if(customer.name.toLowerCase().indexOf(query.toLowerCase()) == 0 || customer.surname.toLowerCase().indexOf(query.toLowerCase()) == 0) {
          console.log(customer);
            filtered.push(customer);
        } 
       
    }

    return filtered;
}
   

selectEvent() {

  this.showClientData=true;
  // do something with selected item
}

openAddVehicleModal(newVehicle) {
  this.modalService.open(newVehicle);
}
openAddCustomerModal(newCustomer) {
  this.modalService.open(newCustomer);
}






}
