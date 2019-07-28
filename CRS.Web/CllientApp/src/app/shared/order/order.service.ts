import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { clientDetails } from '../model/order/clientDetails';
import { throwError, BehaviorSubject, Observable } from 'rxjs';
import { Customer } from '../model/Customers/customer';
import { Vehicle } from '../model/Vehicles/vehicle';
import { CustomerService } from '../customer/customer.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private fb: FormBuilder, private httpClient: HttpClient, private customerServie: CustomerService) { }

  private customer=new Customer();
  private customerSource = new BehaviorSubject < Customer > (this.customer);
  currentCustomer = this.customerSource.asObservable();

 
  public setUser(customer: Customer) {
    
    this.customerSource.next(customer);
  }
    public setCustomer(customer: Customer) {
      let customerToImport: Customer;
     this.customerServie.getCustomer(customer.id).subscribe(resCustomer => {
      customerToImport = resCustomer;
     // console.log('seriws' + customerToImport.)
      this.customerSource.next(customerToImport);
     })
    
   
  }

  private vehicle=new Vehicle();
  private vehicleSource = new BehaviorSubject < Vehicle > (this.vehicle);
  currentvehicle = this.vehicleSource.asObservable();

 
  public setVehicle(vehicle: Vehicle) {
    this.vehicleSource.next(vehicle);
  }

  readonly URL = 'https://localhost:44359/api/Order';

  getCustomersWithVehicles() {
    return this.httpClient.get<clientDetails>(this.URL+'/GetCustomersWithVehicles').pipe((catchError(this.handleError)));;
  }
 

  private handleError(errorResponse: HttpErrorResponse) {
    if (errorResponse.error instanceof ErrorEvent) {
      console.error('Client side error', errorResponse.error.message);
    } else {
      console.error('Server side error', errorResponse);
    }
    return throwError('Service problem');
  }
}
