import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';



import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DataTablesModule } from 'angular-datatables';

import { AllOrdersComponent } from './carRepairShopManagement/order/all-orders/all-orders.component';
import { OrderComponent } from './carRepairShopManagement/order/order.component';
import { MainComponent } from './layout/main/main.component';
import { UserManagementComponent } from './userManagement/user-management.component';

import { LoginComponent } from './login/login.component';
import { LoginService } from './shared/user/login.service';

import { AuthInterceptor } from './auth/auth.interceptor';


import { UserService } from './shared/user/user.service';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { ModalService } from './shared/modal.service';

import { ChangePasswordService } from './shared/user/change-password.service';

import { FormValidatorService } from './shared/validator/form-validator.service';

import { ResetPasswordComponent } from './login/reset-password/reset-password.component';
import { RegistrationComponent } from './userManagement/registration/registration.component';
import { ChangePasswordComponent } from './userManagement/change-password/change-password.component';
import { DeleteUserComponent } from './userManagement/delete-user/delete-user.component';
import { AddJobComponent } from './carRepairShopManagement/add-job/add-job.component';
import { CustomerComponent } from './carRepairShopManagement/customer/customer.component';
import { AddCustomerComponent } from './carRepairShopManagement/customer/add-customer/add-customer.component';
import { AllCustomerComponent } from './carRepairShopManagement/customer/type-of-customer/all-customer/all-customer.component';
import { PrivateCustomerComponent } from './carRepairShopManagement/customer/type-of-customer/private-customer/private-customer.component';
import { BusisnessCustomerComponent } from './carRepairShopManagement/customer/type-of-customer/busisness-customer/busisness-customer.component';
import { RegisterService } from './shared/user/register.service';
import { CustomerService } from './shared/customer/customer.service';
import { TypeOfCustomerComponent } from './carRepairShopManagement/customer/type-of-customer/type-of-customer.component';
import { TypeOfCustomerTemplateComponent } from './carRepairShopManagement/customer/type-of-customer/type-of-customer-template/type-of-customer-template.component';
import { CustomerDetailsComponent } from './carRepairShopManagement/customer/customer-details/customer-details.component';
import { VehicleComponent } from './carRepairShopManagement/vehicle/vehicle.component';
import { AddVehicleComponent } from './carRepairShopManagement/vehicle/add-vehicle/add-vehicle.component';
import { VehicleDetailsComponent } from './carRepairShopManagement/vehicle/vehicle-details/vehicle-details.component';
import { VehicleService } from './shared/vehicle/vehicle.service';


@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    LoginComponent,
    AllOrdersComponent,
    OrderComponent,
    MainComponent,
    UserManagementComponent,
    ChangePasswordComponent,
    DeleteUserComponent,
    ResetPasswordComponent,
    AddJobComponent,
    CustomerComponent,
    AddCustomerComponent,
    AllCustomerComponent,
    PrivateCustomerComponent,
    BusisnessCustomerComponent,
    TypeOfCustomerComponent,
    TypeOfCustomerTemplateComponent,
    CustomerDetailsComponent,
    VehicleComponent,
    AddVehicleComponent,
    VehicleDetailsComponent,




  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(),
    FormsModule,
    DataTablesModule,
    NgbModule,
  
    
    
    
    
  ],
  providers: [RegisterService, LoginService, UserService, ModalService, ChangePasswordService, VehicleService, CustomerService, FormValidatorService,{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent],

})
export class AppModule { }
