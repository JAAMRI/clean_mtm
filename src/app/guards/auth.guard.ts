import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import Auth from '@aws-amplify/auth';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router) { }
    async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
        if (state.url.includes('/recipes/discover')) {
            // check if the route is on the discover page and has an appropriate filter
            return true
        }
        // otherwise check if logged in
        return Auth.currentAuthenticatedUser().then((res) =>
            !!res

        ).catch(err => {
            //    return to auth login with the current url as its redirdct param
            this.router.navigate(['/auth/login'], { queryParams: { returnUrl: state.url }, queryParamsHandling: "preserve" });
            return false;
        })
    }
}