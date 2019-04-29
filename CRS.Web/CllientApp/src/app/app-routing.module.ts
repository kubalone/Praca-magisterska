import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './login/login.component';
import { UserManagementComponent } from './userManagement/user-management.component';
import { MainComponent } from './layout/main/main.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistrationComponent } from './userManagement/user/registration/registration.component';
import { OrderComponent } from './carRepairShopManagement/order/order.component';
import { AllOrdersComponent } from './carRepairShopManagement/order/all-orders/all-orders.component';

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {
    path: '', component: MainComponent, canActivate: [AuthGuard],
    children: [
      {
        path: 'panel-administracyjny', component: UserManagementComponent,
        children: [
          {path: 'rejestracja', component: RegistrationComponent}
        ]
      },
      {
        path: 'zlecenia', component: OrderComponent,
        children: [
          {path: 'wszystkie-zlecenia', component: AllOrdersComponent}
        ]
      }
    ],
  },
  {path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
