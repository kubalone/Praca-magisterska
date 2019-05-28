import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './login/login.component';
import { UserManagementComponent } from './userManagement/user-management.component';
import { MainComponent } from './layout/main/main.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrderComponent } from './carRepairShopManagement/order/order.component';
import { AllOrdersComponent } from './carRepairShopManagement/order/all-orders/all-orders.component';
import { AddJobComponent } from './carRepairShopManagement/add-job/add-job.component';
import { CustomerComponent } from './carRepairShopManagement/customer/customer.component';
import { AllCustomerComponent } from './carRepairShopManagement/customer/type-of-customer/all-customer/all-customer.component';
import { PrivateCustomerComponent } from './carRepairShopManagement/customer/type-of-customer/private-customer/private-customer.component';
import { BusisnessCustomerComponent } from './carRepairShopManagement/customer/type-of-customer/busisness-customer/busisness-customer.component';
import { TypeOfCustomer } from './shared/model/Customers/typeOfCustomer';
import { TypeOfCustomerComponent } from './carRepairShopManagement/customer/type-of-customer/type-of-customer.component';
import { CustomerDetailsComponent } from './carRepairShopManagement/customer/customer-details/customer-details.component';



const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'klienci', redirectTo: 'klienci/wszyscy-klienci' },
  //{path: '', redirectTo: 'wszystkie-zlecenia', pathMatch: 'full', canActivate: [AuthGuard]},
  {
    path: '', component: MainComponent, canActivate: [AuthGuard],

    children: [
      {
        path: 'panel-administracyjny', component: UserManagementComponent, canActivate: [AuthGuard], data: { permittedRoles: ['Admin'] },

      },
      {
        path: 'dodaj-zlecenie', component: AddJobComponent, canActivate: [AuthGuard]
      },
      {
        path: 'klienci', component: CustomerComponent, canActivate: [AuthGuard],
        children: [
          {
            path: '', component: TypeOfCustomerComponent, canActivate: [AuthGuard],
            children: [
              {
                path: 'wszyscy-klienci', component: AllCustomerComponent, canActivate: [AuthGuard]
              },
              {
                path: 'osoby-prywatne', component: PrivateCustomerComponent, canActivate: [AuthGuard]
              },
              {
                path: 'klienci-firmowi', component: BusisnessCustomerComponent, canActivate: [AuthGuard]
              }
            ]
          },
          { path: 'informacje/:id', component: CustomerDetailsComponent, canActivate:[AuthGuard]}


        ]
      },

      {
        path: 'zlecenia', component: OrderComponent,
        children: [
          { path: 'wszystkie-zlecenia', component: AllOrdersComponent }
        ]
      }
    ],
  },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
