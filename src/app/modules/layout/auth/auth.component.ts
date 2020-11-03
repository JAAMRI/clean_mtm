import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NavigationEnd, Router, ActivatedRoute, UrlSerializer } from '@angular/router';
import Auth from '@aws-amplify/auth';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { ICredentials } from '../../../interfaces/auth/credentials';
import { AccountService } from '../../../services/account/account.service';
import { AdobeDtbTracking } from '../../../services/adobe_dtb_tracking.service';
import { MealFavouritesService } from '../../../services/meal-favourites/meal-favourites.service';
import { MealPlanService } from '../../../services/meal-plan/meal-plan.service';
import { PreferencesService } from '../../../services/preferences/preferences.service';
import { scrollToTop } from '../../../utilities/helper-functions';
import { EmailForm, LoginForm, RegisterForm } from './auth.forms';

enum AuthType {
  LOGIN = 'LOGIN',
  REGISTER = 'REGISTER',
  FORGOT_PASSWORD = 'FORGOT_PASSWORD'
}

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit, OnDestroy {

  emailForm = EmailForm;
  loginForm = LoginForm;
  registerForm = RegisterForm;

  //forgot password components
  emailValidated: boolean;
  activeRoute: string = '';
  unsubscribeAll = new Subject()
  loading: boolean = false;

  constructor(
    private snackBar: MatSnackBar,
    private accountService: AccountService,
    private mealPlanService: MealPlanService,
    private preferencesService: PreferencesService,
    private mealFavouritesService: MealFavouritesService,
    public adobeDtbTracking: AdobeDtbTracking,
    private router: Router,
    private route: ActivatedRoute,

  ) { }

  ngOnInit() {
    scrollToTop();
    this.watchRoute();
    this.setActiveRoute(this.router.url);
  }

  setActiveRoute(url: string) {
    // using .includes here incase of queryparams
    if (url.includes('/auth/login')) {
      this.activeRoute = AuthType.LOGIN;
    }
    else if (url.includes('/auth/register')) {
      this.activeRoute = AuthType.REGISTER;
    }
    else if (url.includes('/auth/forgot-password')) {

      this.activeRoute = AuthType.FORGOT_PASSWORD;
    } else {
      this.activeRoute = AuthType.LOGIN;

    }
  }


  watchRoute() {
    this.router.events.pipe(takeUntil(this.unsubscribeAll),
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.setActiveRoute(event.url);
    });
  }

  viewRegister() {
    this.router.navigate(['/auth/register'], { queryParamsHandling: 'preserve' });
    this.registerForm.patchValue(this.emailForm.value);
  }

  viewLogin() {
    this.router.navigate(['/auth/login'], { queryParamsHandling: 'preserve' });
  }


  viewForgotPassword() {
    this.router.navigate(['/auth/forgot-password'], { queryParamsHandling: 'preserve' });
    this.adobeDtbTracking.anchorLink('Link leading to reset password page on sign in popup');

  }


  updateLocalStorageValuesToServer() {
    const mealPlan = JSON.parse(localStorage.getItem('mealPlan'))
    const preferences = localStorage.getItem('preferences') || '';
    const favourites = JSON.parse(localStorage.getItem('favourites'))

    if (mealPlan) {
      for (const meal of mealPlan) {
        this.mealPlanService.saveMealPlan(mealPlan, meal.id)
      }
    }

    if (favourites) {
      for (const favourite of favourites) {
        this.mealFavouritesService.saveMealFavourites(favourites, favourite.id)
      }
    }

    this.preferencesService.savePreferences(preferences)

  }

  async signIn(credentials: ICredentials) {

    try {
      const { username, password, firstTime } = credentials;
      this.loading = true;

      await Auth.signIn(username.toLowerCase(), password);
      if (this.route.snapshot.queryParams && this.route.snapshot.queryParams['returnUrl']) {
        // check if there is a redirectTo in the query params and redirect to this instead
        const redirectRoute = this.route.snapshot.queryParams['returnUrl'];

        this.router.navigateByUrl(redirectRoute, { queryParamsHandling: "preserve" });
      } else {

        this.router.navigate(['/recipes/discover'], { queryParamsHandling: "preserve" });
      }
      this.loading = false;

      // Update only if user is signing in for the first time right after signing up
      if (firstTime) {
        this.updateLocalStorageValuesToServer();
        this.adobeDtbTracking.firstTimeUser('New Registration');
      } else {
        this.adobeDtbTracking.returningUser();
      }
      this.accountService.emitAuthStateChanged();
      this.accountService.setLoggedIn(true);
    } catch (err) {

      // if (err.code === 'UserNotConfirmedException') {
      //   // The error happens if the user didn't finish the confirmation step when signing up
      //   // In this case you need to resend the code and confirm the user
      //   // About how to resend the code and confirm the user, please check the signUp part
      // } else if (err.code === 'PasswordResetRequiredException') {
      //   // The error happens when the password is reset in the Cognito console
      //   // In this case you need to call forgotPassword to reset the password
      //   // Please check the Forgot Password part.
      // } else if (err.code === 'NotAuthorizedException') {
      //   // The error happens when the incorrect password is provided
      // } else if (err.code === 'UserNotFoundException') {
      //   // The error happens when the supplied username/email does not exist in the Cognito user pool
      // } else {
      // }
      console.log(err);
      this.snackBar.open("Sorry! We could not sign you in at this time. PLease try again later.", null, { duration: 2500 });
      this.loading = false;
    }
  }

  sendEmailVerification() {
    this.snackBar.open('Email verification on is way! Check your inbox for details..', null, { duration: 2000 });
    //  just a test email verificatio
  }

  validateEmail() {
    // this is for forgot password
    this.emailValidated = true;
    this.snackBar.open('A code has been sent to your email, please enter it for verification purposes!', null, { duration: 3000 })
  }

  updatePassword(data: { email: string, code: string, password: string }) {
    const { email: username, password: newPassword, code } = data;
    Auth.forgotPasswordSubmit(username, code, newPassword)
      .then(async (_) => {
        this.snackBar.open('Your password has been successfully updated', null, { duration: 3000 })
        //Automatically sign in User
        await this.signIn({ username: username, password: newPassword })
        //
      })
      .catch(err => {
        console.log(err);
        this.snackBar.open("Sorry! An error has occured updating your password" , null, { duration: 2500 });
      });
  }

  ngOnDestroy() {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }



}
