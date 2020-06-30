import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router } from "@angular/router";
import Auth from '@aws-amplify/auth';
import { AccountService } from '../services/account/account.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private accountService: AccountService,
        private router: Router) { }
    async canActivate(_: ActivatedRouteSnapshot): Promise<boolean> {
        return Auth.currentAuthenticatedUser().then((res) => {
            if (res) {
                return true;
            }
        }).catch(err => {
            console.log('err');
            console.log(err);
            this.router.navigate(['/'])
            return false;
        })
    }
}