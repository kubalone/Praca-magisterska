import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/shared/order/order.service';

@Component({
  selector: 'app-actual-orders',
  templateUrl: './actual-orders.component.html',
  styleUrls: ['./actual-orders.component.css']
})
export class ActualOrdersComponent implements OnInit {

  
  actualOrders:  [];
  showLoading = true;
  showTable = false;
  ordersType = "Aktualne naprawy"

  constructor(private service: OrderService) { }

  ngOnInit() {
    this.getActualOrders();
  }
  getActualOrders() {
    this.service.getActualOrders().subscribe((res: any) => {
      this.actualOrders = res;
      this.showLoading= false;
      this.showTable = true;
    });
  }
}
