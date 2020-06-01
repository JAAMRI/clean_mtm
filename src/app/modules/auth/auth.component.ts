import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import Auth from '@aws-amplify/auth';
import { Breadcrumb } from '../../components/breadcrumbs/breadcrumbs.component';
import { PersonalInfoComponent } from '../../components/personal-info/personal-info.component';
import { AccountService } from '../../services/account/account.service';
import { AdobeDtbTracking } from '../../services/adobe_dtb_tracking.service';
import { MealFavouritesService } from '../../services/meal-favourites/meal-favourites.service';
import { MealPlanService } from '../../services/meal-plan/meal-plan.service';
import { PreferencesService } from '../../services/preferences/preferences.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {

  email: string;
  registerForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email])
  });
  authForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  })
  // the stepper is in the form: sign in: 0, create account: 1, forgot password: 2
  @ViewChild("appPersonalInfo", { static: false }) private appPersonalInfo: PersonalInfoComponent;

  //forgot password components
  emailValidated: boolean;
  codeValidated: boolean;
  invalidCode: boolean;
  invalidEmail: boolean;
  breadcrumbs: Breadcrumb[] = [{
    name: 'Select Meals',
    active: false
  },
  {
    name: 'Meal Plan',
    active: false
  },
  {
    name: 'Grocery List',
    active: false
  },
  ]

  constructor(
    private snackBar: MatSnackBar,
    private accountService: AccountService,
    private mealPlanService: MealPlanService,
    private preferencesService: PreferencesService,
    private mealFavouritesService: MealFavouritesService,
    public adobeDtbTracking: AdobeDtbTracking

  ) { }

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

  async signIn(credentials: any) {
    try {
      const user = await Auth.signIn(credentials.username.toLowerCase(), credentials.password);
      // Update only if user is signing in for the first time right after signing up
      if (credentials.hasOwnProperty('firstTimeSignIn')) {
        (credentials.firstTimeSignIn) ? this.updateLocalStorageValuesToServer() : null;
      }
      this.accountService.emitAuthStateChanged();
      this.accountService.loggedIn = true;
      // this.mtmauthService.loggedIn = true;
      if (credentials.hasOwnProperty('firstTimeSignIn')) {
        this.adobeDtbTracking.firstTimeUser('New Registration');
      } else {
        this.adobeDtbTracking.returningUser();
      }
    } catch (err) {
      if (err.code === 'UserNotConfirmedException') {
        // The error happens if the user didn't finish the confirmation step when signing up
        // In this case you need to resend the code and confirm the user
        // About how to resend the code and confirm the user, please check the signUp part
      } else if (err.code === 'PasswordResetRequiredException') {
        // The error happens when the password is reset in the Cognito console
        // In this case you need to call forgotPassword to reset the password
        // Please check the Forgot Password part.
      } else if (err.code === 'NotAuthorizedException') {
        // The error happens when the incorrect password is provided
      } else if (err.code === 'UserNotFoundException') {
        // The error happens when the supplied username/email does not exist in the Cognito user pool
      } else {
        console.log(err);
      }
      this.snackBar.open("Sorry! " + err.message, null, { duration: 2500 });
    }
  }

  // order of slider is listed above
  routeToRegisterPage() {
  }

  stepToForgotPassword() {
    this.adobeDtbTracking.anchorLink('Link leading to reset password page on sign in popup');

  }

  stepToCreateAccount() {
    this.email = this.registerForm.controls.email.value;
    this.appPersonalInfo.setEmailFromStep1(this.registerForm.controls.email.value);
  }

  sendEmailVerification() {
    this.snackBar.open('Email verification on is way! Check your inbox for details..', null, { duration: 2000 });
    //  just a test email verificatio
  }

  validateEmail(email: string) {
    // this is for forgot password
    this.emailValidated = true;
    this.snackBar.open('A code has been sent to your email, please enter it for verification purposes!', null, { duration: 3000 })
  }

  updatePassword(data: { email: string, code: string, password: string }) {
    let username = data.email;
    let newPassword = data.password;
    let code = data.code;
    Auth.forgotPasswordSubmit(username, code, newPassword)
      .then(data => {
        this.snackBar.open('Your password has been successfully updated', null, { duration: 3000 })
        //Automatically sign in User
        this.signIn({ username: username, password: newPassword })
        //
      })
      .catch(err => {
        console.log(err);
        this.snackBar.open("Sorry! " + err.message, null, { duration: 2500 });
      });
  }



}
