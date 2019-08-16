import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from 'src/app/shared/order/order.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {

  constructor(private route: ActivatedRoute, private serviceOrder: OrderService, private router: Router) { }
  order;
  typeOfClient: string;
  fieldName: string;
  fullName: string;  
  showLoading = true;
  showOrderDetails = false;
  ngOnInit() {
    this.route.paramMap.subscribe(param => {
      const id = +param.get('id');
      this.getOrderById(id);
 
    });
  }
  getOrderById(id: number) {
    this.serviceOrder.getOrder(id).subscribe(res =>{
      this.order = res;
      this.showLoading = false;
      this.showOrderDetails=true;
   
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
  viewCustomer(id:number){
    console.log(id);
    this.router.navigate(['klienci/informacje', id])
  } 
  viewVehicle(id:number){
    console.log(id);
    this.router.navigate(['pojazdy/informacje', id])
  } 
  edit(id) {
    this.router.navigate(['edytuj-zlecenie', id])
  }

}
