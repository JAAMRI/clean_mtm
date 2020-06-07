import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router } from "@angular/router";
import { map } from "rxjs/operators";
import { AccountService } from '../services/account/account.service';
import Auth from '@aws-amplify/auth';

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
            console.log(err);
            this.router.navigate(['/'])
            return false;
        })
    }
}