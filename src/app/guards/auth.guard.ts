import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import Auth from '@aws-amplify/auth';
import { AccountService } from '../services/account/account.service';
import { FilterIdsByName } from '../components/dialogs/filter/filter.data';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router) { }
    async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
        if (FilterIdsByName[route.queryParams['filter']] && route.url[0].path.includes('discover')) {
            // check if the route is on the discover page and has an appropriate filter
            return true
        }
        // otherwise check if logged in
        return Auth.currentAuthenticatedUser().then((res) => {
            if (res) {
                    return true;
            } 
        }).catch(err => {
        //    return to auth login with the current url as its redirdct param
            this.router.navigate(['/auth/login'], { queryParams: { returnUrl: state.url }});
            return false;
        })
    }
}