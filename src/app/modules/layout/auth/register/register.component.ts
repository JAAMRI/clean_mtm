import { Component, OnInit, Input, EventEmitter, Output, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatIconRegistry } from '@angular/material/icon';
import { ErrorStateMatcher } from '@angular/material/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from "@angular/router";
import Auth from '@aws-amplify/auth';
import * as moment from 'moment';
import { Subject } from 'rxjs';
import { AccountService } from '../../../../../app/services/account/account.service';
import { MealPlanService } from '../../../../../app/services/meal-plan/meal-plan.service';
import { AdobeDtbTracking } from '../../../../../app/services/adobe_dtb_tracking.service';
import { ICredentials } from '../../../../interfaces/auth/credentials';
import { PasswordErrorMatcher } from '../auth.forms';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RegisterComponent implements OnInit {

  passwordMatcher = new PasswordErrorMatcher();

  @Output() signIn = new EventEmitter<ICredentials>();

  unsubscribeAll = new Subject();
  loading = false;
  viewMore = false;
  // @Input() email: string;
  @Input() onProfilePage: boolean;
  @Input() isMobile: boolean;
  @Input() registerForm: FormGroup;
  @Output() back = new EventEmitter();
  constructor(
    private matIconRegistry: MatIconRegistry,
    private accountService: AccountService,
    private sanitizer: DomSanitizer,
    private snackBar: MatSnackBar,
    private router: Router,
    private mealPlanService: MealPlanService,
    public adobeDtbTracking: AdobeDtbTracking
  ) {
    this.matIconRegistry.addSvgIcon('gender', this.sanitizer.bypassSecurityTrustResourceUrl('assets/static_images/profile-icons/gender.svg'));
  }

  ngOnInit() {
    if (this.onProfilePage) {
      this.getUserAttributes();
    }
  }

  async getUserAttributes() {
    try {
      Auth.currentAuthenticatedUser({
        bypassCache: true  // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
      }).then(currentUser => {

        this.registerForm.controls.family_name.setValue(currentUser.attributes.family_name);
        this.registerForm.controls.given_name.setValue(currentUser.attributes.given_name);
        this.registerForm.controls.email.setValue(currentUser.attributes.email);
        currentUser.attributes.birthdate && this.registerForm.controls.birthdate.setValue(moment(currentUser.attributes.birthdate).toISOString());
        this.registerForm.controls.postal_code.setValue(currentUser.attributes['custom:postal_code']);
      })
        .catch(err => {
          this.accountService.loggedIn = false;
          this.router.navigateByUrl("./");
        }
        );
    } catch (err) {
      console.log(err);
    }
  }

  setEmailFromStep1(emailFromLastStep: string) {
    this.registerForm.controls.email.setValue(emailFromLastStep);
  }

  submitForm() {
    (this.onProfilePage) ? this.update() : this.signUp();
  }

  async signUp() {
    let currentMealPlan = await this.mealPlanService.getMealPlan();
    let meal_plan_started = currentMealPlan && currentMealPlan.length ? 1 : 0; //Check wether the user signed up after having created a mealplan or before
    let username = this.registerForm.controls.email.value.toLowerCase();
    let password = this.registerForm.controls.password.value;
    let postal_code = this.registerForm.controls.postal_code.value;
    let given_name = this.registerForm.controls.given_name.value;
    let family_name = this.registerForm.controls.family_name.value;
    let opt_in = this.registerForm.controls.opt_in.value;
    let locale = "CA-en"
    let website = "mealsthatmatter.com";
    let updated_at = new Date().getTime().toString();

    Auth.signUp({
      username,
      password,
      attributes: {
        'given_name': given_name,
        'family_name': family_name,
        'locale': locale,
        'custom:opt_in': opt_in ? opt_in.toString() : 'false',
        'website': website,
        'updated_at': updated_at,
        'custom:meal_plan_started': meal_plan_started.toString(),
        'custom:postal_code': postal_code.toString()
      }
    })
      .then(data => {
        //Sign User Automatically
        const credentials: ICredentials = { username: username, password: password, firstTime: true };
        this.signIn.emit(credentials);

        this.snackBar.open("Congrats! Your profile has been created. Now you can save your personalized meal plans after you build them. See you in the kitchen!", null, { duration: 4500 });
        //End Sign user In automatically
      })
      .catch(err => {
        this.snackBar.open("Oops! " + err.message, null, { duration: 2500 });
      });
  }//End signUp function

  async update() {
    let user = await Auth.currentAuthenticatedUser();
    let attributes = {
      'email': this.registerForm.controls.email.value,
      'family_name': this.registerForm.controls.family_name.value,
      'given_name': this.registerForm.controls.given_name.value,
      'updated_at': new Date().getTime().toString()
    }
    if (this.registerForm.controls.postal_code.value) {
      attributes['custom:postal_code'] = this.registerForm.controls.postal_code.value;
    }
    if (this.registerForm.controls.birthdate.value) {
      const momentDate = new Date(this.registerForm.controls.birthdate.value);
      const formattedDate = moment(momentDate).format("YYYY-MM-DD");
      attributes['birthdate'] = formattedDate;
    }
    let result = await Auth.updateUserAttributes(user, attributes)
      .then(res => {
        this.snackBar.open("Profile info successfully updated.", null, { duration: 3000 });
      })
      .catch(err => {
        this.snackBar.open(err.message, null, { duration: 3000 });//Show err message
      });
    this.adobeDtbTracking.updateInformation();
  }

  signOut() {
    this.adobeDtbTracking.signout();
    Auth.signOut()
      .then(data => {
        this.accountService.loggedIn = false;
        this.router.navigate(['/']);
      })
      .catch(err => {
        alert(err.message);
      });

  }

  goBack() {
    this.back.emit();
  }
}