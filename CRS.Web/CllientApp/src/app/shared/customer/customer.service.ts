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
  privateListOfCum = new BehaviorSubject<Array<Customer>>([]);
  
  constructor(private fb: FormBuilder, private httpClient: HttpClient) {
    this.privateListOfCum.next([
      {name: "Reno", surname:"Rino", province:"Bielsko"}
    ]);
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
    name: ['', Validators.pattern(this.letterAndSpaces)],
    surname: ['', Validators.pattern(this.letterAndSpaces)],
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

  addCustomer() {
    var customer: Customer = {
      typeOfCustomerID: this.formModel.value.typeOfCustomerID,
      companyName: this.formModel.value.companyName,
      name: this.formModel.value.name,
      surname: this.formModel.value.surname,
      province: this.formModel.value.adress.province,
      city: this.formModel.value.adress.city,
      zipCode: this.formModel.value.adress.zipCode,
      street: this.formModel.value.adress.street,
      numberOfBuilding: this.formModel.value.adress.numberOfBuilding,
      numberOfApartment: this.formModel.value.adress.numberOfApartment,
      email: this.formModel.value.contact.email,
      phone: this.formModel.value.contact.phone
    };
    const list =this.privateListOfCum.getValue();
    list.push(customer)
    this.privateListOfCum.next(list);
    //return this.httpClient.post(this.URL + "/AddCustomer", customer).pipe(catchError(this.handleError));
  }
  //do usunięcia
  getList():Observable<Array<Customer>>{
    return this.privateListOfCum.asObservable();
  }
  //daje typy klientów
  getTypesOfCustomer() {
    return this.httpClient.get<TypeOfCustomer>(this.URL + '/GetTypes').pipe(catchError(this.handleError));
  }

  
  checkRequiredInstitutionName(id: number) {
   
    const companyNameControl = this.formModel.get('companyName');
    if(id == 2) {
      companyNameControl.setValidators(Validators.required);
      this.check=true;
     
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
    },
    'name': {
      'pattern': 'Nieprawidłowa sekwencja znaków. Sprawdź pisownię.',
    },
    'surname': {
      'pattern': 'Nieprawidłowa sekwencja znaków. Sprawdź pisownię.',
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
      'email': 'Proficiency is required.',
    },
    'phone': {
      'pattern': 'Nieprawidłowa sekwencja znaków. Sprawdź pisownię.',
      'required': 'Numer telefonu jest wymagany',
    },
  };
}
