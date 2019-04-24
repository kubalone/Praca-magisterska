import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistrationComponent } from './userManagement/user/registration/registration.component';
import { UserComponent } from './userManagement/user/user.component';
import { LoginComponent } from './userManagement/user/login/login.component';

const routes: Routes = [
  {path: '', redirectTo: '/user/registration', pathMatch: 'full'},
  {
    path: 'user', component: UserComponent,
    children: [
      {path: 'registration', component: RegistrationComponent},
      {path: 'login', component: LoginComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
