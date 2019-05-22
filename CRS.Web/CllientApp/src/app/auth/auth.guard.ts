import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../shared/user/user.service';
import { routerNgProbeToken } from '@angular/router/src/router_module';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private service: UserService) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (localStorage.getItem('token') != null) {
      let roles = route.data.permittedRoles as Array<string>;

      if (roles) {

        if (this.service.rolesMatch(roles)) {
          return true;
        } else {

          this.router.navigateByUrl('zlecenia/wszystkie-zlecenia');
          return false;
        }
      }
      return true;
    } else {
      return false;
    }
  }


}
