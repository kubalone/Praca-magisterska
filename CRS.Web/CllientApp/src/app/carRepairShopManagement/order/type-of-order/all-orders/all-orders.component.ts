import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/shared/order/order.service';

@Component({
  selector: 'app-all-orders',
  templateUrl: './all-orders.component.html',
  styleUrls: ['./all-orders.component.css']
})
export class AllOrdersComponent implements OnInit {

  constructor(private service: OrderService) { }
  orders: [];
  showLoading = true;
  showTable = false;
 
  ordersType = "Wszystkie naprawy";
  ngOnInit() { 
   this.getAllOrders();
   
  }
  getAllOrders() {
    this.service.getOrders().subscribe((res: any) => {
      this.orders = res;
      this.showLoading= false;
      this.showTable = true;
    });
  }
}