import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { throwError } from 'rxjs';
import { Vehicle } from '../model/Vehicles/vehicle';
import { catchError } from 'rxjs/operators';
import { Brand } from '../model/Vehicles/brand';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  constructor(private fb: FormBuilder, private httpClient: HttpClient) { }
  
  
  readonly URL = 'https://localhost:44359/api/Vehicle';

  formModel = this.fb.group({
    modelYear: ['', Validators.required],
    brand: ['', Validators.required],
    model: ['', Validators.required],
    registration: ['', Validators.required],
    colour: [''],
    vin: [''],
    fuel: [''],
    mileAge: [''],
    power: [''],
    displacementCapacity: [''],
  });

  addVehicle(vehicle: Vehicle) {
    return this.httpClient.post(this.URL + "/CreateVehicle", vehicle);
   }

  getVehicles() {
    return this.httpClient.get<Vehicle>(this.URL + '/GetAllVehicle').pipe((catchError(this.handleError)));
  }

  getVehicle(id:number) {
    return this.httpClient.get<Vehicle>(`${this.URL}/${'GetVehicle/'}${id}`).pipe((catchError(this.handleError)));
  }

  updateVehicle(vehicle: Vehicle) {
    return this.httpClient.put<Vehicle>(`${this.URL}/${'PutVehicle/'}${vehicle.id}`, vehicle);
  }

  getBrand() {
    return this.httpClient.get<Brand>(this.URL + '/GetAllBrands').pipe((catchError(this.handleError)));
  }
  getModel(id:number) {
    return this.httpClient.get(`${this.URL}/${'GetConcreteModels/'}${id}`).pipe((catchError(this.handleError)));
  }
  deleteVehicle(id:number) {
    return this.httpClient.delete(`${this.URL}/${'DeleteVehicle/'}${id}`);
  }

  formErrors = {
    'modelYear': '',
    'brand': '',
    'model': '',
    'registration': '',
    'colour': '',
    'vin': '',
    'fuel': '',
    'mileAge': '',
    'power': '',
    'displacementCapacity': ''
  };

  validationMessages = {
    'modelYear': {
      'required': 'Rocznik samochodu jest wymagany.',
    },
    'brand': {
      'required:': 'Marka samochodu jest wymagana.'
    },
    'model': {
      'required': 'Model samochodu jest wymagany.'
    },
    'registration': {
      'required': 'Numer rejestracyjny samochodu jest wymagany.'
    },
    'colour': {
    },
    'vin': {
    },
    'fuel': {
    },
    'mileAge': {
    },
    'power': {
    },
    'displacementCapacity': {
    }
  };
  
  private handleError(errorResponse: HttpErrorResponse) {
    if (errorResponse.error instanceof ErrorEvent) {
      console.error('Client side error', errorResponse.error.message);
    } else {
      console.error('Server side error', errorResponse);
    }
    return throwError('Service problem');
  }
}


