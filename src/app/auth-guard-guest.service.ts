import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuestService implements CanActivate{

  constructor(public auth: AuthService, public router: Router) {}

  canActivate(): boolean {
    if (this.auth.isAuthenticated("admin")) {
      this.router.navigate(['admin','laporan_pemuatan']);
      return false;
    }
    
    if (this.auth.isAuthenticated("user")) {
      this.router.navigate(['user','laporan_pemuatan']);
      return false;
    }
    return true;
  }
}
