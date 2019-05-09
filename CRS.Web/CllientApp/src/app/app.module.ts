import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { RegistrationComponent } from './userManagement/users/registration/registration.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DataTablesModule } from 'angular-datatables';

import { AllOrdersComponent } from './carRepairShopManagement/order/all-orders/all-orders.component';
import { OrderComponent } from './carRepairShopManagement/order/order.component';
import { MainComponent } from './layout/main/main.component';
import { UserManagementComponent } from './userManagement/user-management.component';

import { LoginComponent } from './login/login.component';
import { LoginService } from './shared/login.service';
import { RegisterService } from './shared/register.service';
import { AuthInterceptor } from './auth/auth.interceptor';

import { UsersComponent } from './userManagement/users/users.component';

import { UserService } from './shared/user.service';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { ModalService } from './shared/modal.service';
import { ChangePasswordComponent } from './userManagement/users/change-password/change-password.component';
import { ChangePasswordService } from './shared/change-password.service';

import { FormValidatorService } from './shared/validator/form-validator.service';
import { DeleteUserComponent } from './userManagement/users/delete-user/delete-user.component';
import { ResetPasswordComponent } from './login/reset-password/reset-password.component';


@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    LoginComponent,
    AllOrdersComponent,
    OrderComponent,
    MainComponent,
    UserManagementComponent,
    UsersComponent,

    ChangePasswordComponent,
    DeleteUserComponent,
    ResetPasswordComponent,




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
    NgbModule
    
    
    
    
  ],
  providers: [RegisterService, LoginService, UserService, ModalService, ChangePasswordService, FormValidatorService,{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent],

})
export class AppModule { }
