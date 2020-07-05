import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(
    public router: Router,
    private accountService: AccountService
  ) { }

  canActivate(): boolean {
    console.log('activating')
    if (!this.accountService.loggedIn) {
      this.router.navigate(['./']);
      return false;
    }
    return true;
  }

}
