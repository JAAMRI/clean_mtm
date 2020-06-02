import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NavigationEnd, Router } from '@angular/router';
import Auth from '@aws-amplify/auth';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { Breadcrumb } from '../../../components/breadcrumbs/breadcrumbs.component';
import { PersonalInfoComponent } from '../../../components/personal-info/personal-info.component';
import { AccountService } from '../../../services/account/account.service';
import { AdobeDtbTracking } from '../../../services/adobe_dtb_tracking.service';
import { MealFavouritesService } from '../../../services/meal-favourites/meal-favourites.service';
import { MealPlanService } from '../../../services/meal-plan/meal-plan.service';
import { PreferencesService } from '../../../services/preferences/preferences.service';
import { ICredentials } from '../../../interfaces/credentials';
import { EmailForm, LoginForm } from './auth.forms';

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

  //forgot password components
  emailValidated: boolean;
  activeRoute: string = '';
  unsubscribeAll = new Subject()

  constructor(
    private snackBar: MatSnackBar,
    private accountService: AccountService,
    private mealPlanService: MealPlanService,
    private preferencesService: PreferencesService,
    private mealFavouritesService: MealFavouritesService,
    public adobeDtbTracking: AdobeDtbTracking,
    private router: Router,

  ) { }

  ngOnInit() {
    this.watchRoute();
    this.setActiveRoute(this.router.url);
  }

  setActiveRoute(url: string) {
    switch (url) {
      case '/auth/login':
        this.activeRoute = AuthType.LOGIN;
        break;
      case '/auth/register':
        this.activeRoute = AuthType.REGISTER;
        break;
      case '/auth/forgot-password':
        this.activeRoute = AuthType.FORGOT_PASSWORD;
        break;
      default:
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
    this.router.navigate(['/auth/register']);
  }

  viewLogin() {
    this.router.navigate(['/auth/login']);
  }


  viewForgotPassword() {
    this.router.navigate(['/auth/forgot-password']);
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
      await Auth.signIn(username.toLowerCase(), password);
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
      this.snackBar.open("Sorry! " + err.message, null, { duration: 2500 });
    }
  }

  // order of slider is listed above
  routeToRegisterPage() {
    this.router.navigate(['/register']);
  }

  stepToForgotPassword() {
    this.adobeDtbTracking.anchorLink('Link leading to reset password page on sign in popup');

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
        this.snackBar.open("Sorry! " + err.message, null, { duration: 2500 });
      });
  }

  ngOnDestroy() {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }



}
