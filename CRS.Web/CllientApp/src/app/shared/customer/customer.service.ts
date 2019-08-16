import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Customer } from '../model/Customers/customer';
import { throwError, BehaviorSubject, Observable } from 'rxjs';
import { TypeOfCustomer } from '../model/Customers/typeOfCustomer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  
  constructor(private fb: FormBuilder, private httpClient: HttpClient) {
   
   }
  
  readonly URL = 'https://localhost:44359/api/Customer';

  check: boolean = false;

  letterAndSpaces = "^[a-zA-ZżźćńółęąśŻŹĆĄŚĘŁÓŃ\s]*$";
  letterSpacesAndSpecificCharacters = "^[a-zA-ZżźćńółęąśŻŹĆĄŚĘŁÓŃ\s-]*$"
  letterNumberAndSpaces = "^[A-Za-zżźćńółęąśŻŹĆĄŚĘŁÓŃ0-9 _ -]*[A-Za-z0-9][A-Za-z0-9 _ -]*$";
  zipCode = "^[[0-9]{2}\-[0-9]{3}]*$";
  phoneNumber = "^[0-9+ ()][0-9- ()]*$";

  formModel = this.fb.group({
    typeOfCustomerID: ['', Validators.required],
    companyName: [''],
    name: ['', [Validators.pattern(this.letterAndSpaces), Validators.required]],
    surname: ['', [Validators.pattern(this.letterAndSpaces), Validators.required]],
    adress: this.fb.group({
      province: ['', Validators.pattern(this.letterAndSpaces)],
      city: ['', Validators.pattern(this.letterSpacesAndSpecificCharacters)],
      zipCode: ['', Validators.pattern(this.zipCode)],
      street: ['', Validators.pattern(this.letterSpacesAndSpecificCharacters)],
      numberOfBuilding: ['', Validators.pattern(this.letterNumberAndSpaces)],
      numberOfApartment: ['', Validators.pattern(this.letterNumberAndSpaces)],
    }),
    contact: this.fb.group({
      email: ['', Validators.email],
      phone: ['', [Validators.pattern(this.phoneNumber),Validators.required]]
    })
  });

  private handleError(errorResponse: HttpErrorResponse) {
    if (errorResponse.error instanceof ErrorEvent) {
      console.error('Client side error', errorResponse.error.message);
    } else {
      console.error('Server side error', errorResponse);
    }
    return throwError('Service problem');
  }

  addCustomer(customer: Customer) {
   return this.httpClient.post(this.URL + "/AddCustomer", customer);
  }

  //daje typy klientów
  getTypesOfCustomer() {
    return this.httpClient.get<TypeOfCustomer>(this.URL + '/GetTypes').pipe(catchError(this.handleError));
  }
  //zwróc listę klientów
  getCustomers() {
    return this.httpClient.get<Customer>(this.URL + '/GetAllCustomers').pipe((catchError(this.handleError)));
  }
  //zwroc liste konkretnych klientów
  getConcreteCustomers(id:number) {
    return this.httpClient.get<Customer>(`${this.URL}/${'GetConcreteCustomers/'}${id}`).pipe((catchError(this.handleError)));
  }
  //Klinet po Id
  getCustomer(id:number) {
    return this.httpClient.get<Customer>(`${this.URL}/${'GetCustomer/'}${id}`).pipe((catchError(this.handleError)));
  }
  //updateCustomer
  updateCustomer(customer: Customer) {
    return this.httpClient.put<Customer>(`${this.URL}/${'PutCustomer/'}${customer.id}`, customer);
  }
  deleteCustomer(id:number) {
    return this.httpClient.delete(`${this.URL}/${'DeleteCustomer/'}${id}`);
  }

  checkRequiredInstitutionName(id: number) {
    console.log(id);
    const companyNameControl = this.formModel.get('companyName');
    if(id == 2) {
      companyNameControl.setValidators(Validators.required);
      this.check=true;
      console.log('required');
     
    } else {
      companyNameControl.clearValidators();
    }
    companyNameControl.updateValueAndValidity();
  }

  formErrors = {
    'typeOfClient': '',
    'companyName': '',
    'name': '',
    'surname': '',
    'province': '',
    'city': '',
    'zipCode': '',
    'street': '',
    'numberOfBuilding': '',
    'numberOfApartment': '',
    'email': '',
    'phone': '',
  };

  validationMessages = {
    'typeOfClient': {
      'required': 'Typ klienta jest wymagany.',
    },
    'companyName': {
      'required:': 'Nazwa przedsiębiorstwa jest wymagana.'
    },
    'name': {
      'pattern': 'Nieprawidłowa sekwencja znaków. Sprawdź pisownię.',
      'required': 'Imię jest wymagane.'
    },
    'surname': {
      'pattern': 'Nieprawidłowa sekwencja znaków. Sprawdź pisownię.',
      'required': 'Nazwisko jest wymagane.'
    },
    'province': {
      'pattern': 'Nieprawidłowa sekwencja znaków. Sprawdź pisownię.',
    },
    'city': {
      'pattern': 'Nieprawidłowa sekwencja znaków. Sprawdź pisownię.',
    },
    'zipCode': {
      'pattern': 'Nieprawidłowa sekwencja znaków. Sprawdź pisownię.',
    },
    'street': {
      'pattern': 'Nieprawidłowa sekwencja znaków. Sprawdź pisownię.',
    },
    'numberOfBuilding': {
      'pattern': 'Nieprawidłowa sekwencja znaków. Sprawdź pisownię.',
    },
    'numberOfApartment': {
      'pattern': 'Nieprawidłowa sekwencja znaków. Sprawdź pisownię.',
    },
    'email': {
      'email': 'Nieprawidłowa sekwencja znaków. Sprawdź pisownię',
    },
    'phone': {
      'pattern': 'Nieprawidłowa sekwencja znaków. Sprawdź pisownię.',
      'required': 'Numer telefonu jest wymagany',
    },
  };
}

