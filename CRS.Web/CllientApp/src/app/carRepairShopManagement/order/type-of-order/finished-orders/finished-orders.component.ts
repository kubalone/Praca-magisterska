import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/shared/order/order.service';

@Component({
  selector: 'app-finished-orders',
  templateUrl: './finished-orders.component.html',
  styleUrls: ['./finished-orders.component.css']
})
export class FinishedOrdersComponent implements OnInit {

  finishedOrders:  [];
  showLoading = true;
  showTable = false;
  ordersType = "Zakończone naprawy"

  constructor(private service: OrderService) { }

  ngOnInit() {
    this.getPrivateCustomers();
  }
  getPrivateCustomers() {
    this.service.getFinishedOrders().subscribe((res: any) => {
      this.finishedOrders = res;
      this.showLoading= false;
      this.showTable = true;
    });
  }
}