import { Component, OnInit, ViewEncapsulation, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatHorizontalStepper } from '@angular/material/stepper';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { PersonalInfoComponent } from '../../personal-info/personal-info.component';
import Auth from '@aws-amplify/auth';
import { AccountService } from '../../../../app/services/account/account.service';
import { PreferencesService } from '../../../../app/services/preferences/preferences.service';
import { MealPlanService } from '../../../../app/services/meal-plan/meal-plan.service';
import { MealFavouritesService } from '../../../../app/services/meal-favourites/meal-favourites.service';
import { AdobeDtbTracking } from '../../../../app/services/adobe_dtb_tracking.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UserFormComponent implements OnInit {
  email: string;
  isMobile: boolean;
  signUpFormStep1 = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email])
  });
  authForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  })
  @ViewChild('stepper', { static: true }) stepper: MatHorizontalStepper;
  // the stepper is in the form: sign in: 0, create account: 1, forgot password: 2
  @ViewChild("appPersonalInfo", { static: false }) private appPersonalInfo: PersonalInfoComponent;

  //forgot password components
  emailValidated: boolean;
  codeValidated: boolean;
  invalidCode: boolean;
  invalidEmail: boolean;


  constructor(public dialogRef: MatDialogRef<UserFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private snackBar: MatSnackBar,
    private accountService: AccountService,
    private mealPlanService: MealPlanService,
    private preferencesService: PreferencesService,
    private mealFavouritesService: MealFavouritesService,
    public adobeDtbTracking: AdobeDtbTracking

  ) { }

  ngOnInit() {
    if (this.data) {
      // check if data was passed through
      this.isMobile = this.data.isMobile;
      // check if mobile. this is sent from component
    }
  }

  closeDialog() {
    this.dialogRef.close();
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

  async signIn(credentials: any) {
    try {
      const user = await Auth.signIn(credentials.username.toLowerCase(), credentials.password);
      // Update only if user is signing in for the first time right after signing up
      if (credentials.hasOwnProperty('firstTimeSignIn')) {
        (credentials.firstTimeSignIn === true) ? this.updateLocalStorageValuesToServer() : null;
      }
      this.accountService.emitAuthStateChanged();
      this.accountService.loggedIn = true;
      this.closeDialog();
      // this.mtmauthService.loggedIn = true;
      if (credentials.hasOwnProperty('firstTimeSignIn')) {
        this.adobeDtbTracking.first_time_user('New Registration');
      } else {
        this.adobeDtbTracking.returning_user();
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
  stepToLoginPage() {
    this.stepper.selectedIndex = 0;
  }

  stepToForgotPassword() {
    this.adobeDtbTracking.anchor_link('Link leading to reset password page on sign in popup');
    this.stepper.selectedIndex = 1;

  }

  stepToCreateAccount() {
    this.email = this.signUpFormStep1.controls.email.value;
    this.stepper.selectedIndex = 2;
    this.appPersonalInfo.setEmailFromStep1(this.signUpFormStep1.controls.email.value);
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
