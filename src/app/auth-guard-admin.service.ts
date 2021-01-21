import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardAdminService implements CanActivate{

  constructor(public auth: AuthService, public router: Router) {}

  canActivate(): boolean {
    if (!this.auth.isAuthenticated("admin")) {
      this.router.navigate(['']);
      return false;
    }
    return true;
  }
}
