import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { RegistrationComponent } from './userManagement/users/registration/registration.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';


import { AllOrdersComponent } from './carRepairShopManagement/order/all-orders/all-orders.component';
import { OrderComponent } from './carRepairShopManagement/order/order.component';
import { MainComponent } from './layout/main/main.component';
import { UserManagementComponent } from './userManagement/user-management.component';

import { LoginComponent } from './login/login.component';
import { LoginService } from './shared/login.service';
import { RegisterService } from './shared/register.service';
import { AuthInterceptor } from './auth/auth.interceptor';
import { EmployeesComponent } from './userManagement/employees/employees.component';
import { UsersComponent } from './userManagement/users/users.component';
import { AddEmployeeComponent } from './userManagement/employees/add-employee/add-employee.component';
import { UserService } from './shared/user.service';

@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    LoginComponent,
    AllOrdersComponent,
    OrderComponent,
    MainComponent,
    UserManagementComponent,
    EmployeesComponent,
    UsersComponent,
    AddEmployeeComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(),
    FormsModule
  ],
  providers: [RegisterService, LoginService, UserService, {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
