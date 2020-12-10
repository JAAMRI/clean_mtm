import { Component, EventEmitter, Inject, Input, LOCALE_ID, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatIconRegistry } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from "@angular/router";
import Auth from '@aws-amplify/auth';
import { Subject } from 'rxjs';
import { AccountService } from '../../../../../app/services/account/account.service';
import { AdobeDtbTracking } from '../../../../../app/services/adobe_dtb_tracking.service';
import { MealPlanService } from '../../../../../app/services/meal-plan/meal-plan.service';
import { environment } from '../../../../../environments/environment';
import { ICredentials } from '../../../../interfaces/auth/credentials';
import { PinterestTrackingService } from '../../../../services/pinterest-tracking.service';
import { ThirdPartyService } from '../../../../services/third-party.service';
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
  loadPinterestNoScript: boolean;
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
    private thirdPartyService: ThirdPartyService,
    private route: ActivatedRoute,
    private mealPlanService: MealPlanService,
    public adobeDtbTracking: AdobeDtbTracking,
    public pinterestService: PinterestTrackingService,
    @Inject(LOCALE_ID) private locale: string
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
        if (currentUser.attributes.birthdate) {
          const userBirthdate = new Date(currentUser.attributes.birthdate);
          userBirthdate.setMinutes(userBirthdate.getMinutes() + userBirthdate.getTimezoneOffset())
          this.registerForm.controls.birthdate.setValue(userBirthdate);
        }
        this.registerForm.controls.postal_code.setValue(currentUser.attributes['custom:postal_code']);
      })
        .catch(err => {
          this.accountService.loggedIn = false;
          this.router.navigateByUrl("./", { queryParamsHandling: "preserve" });
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

  getLocale() {
    // return a mapped locale on how MTM wants it
    if (this.locale === 'fr') {
      return 'fr-CA'
    } else {
      return 'en-CA'
    }
  }

  async signUp() {
    if (environment.production) {
      this.loadPinterestNoScript = true;
      this.pinterestService.trackSignup();
    }
    let currentMealPlan = await this.mealPlanService.getMealPlan();
    let meal_plan_started = currentMealPlan && currentMealPlan.length ? 1 : 0; //Check wether the user signed up after having created a mealplan or before
    let username = this.registerForm.controls.email.value.toLowerCase();
    let password = this.registerForm.controls.password.value;
    let postal_code = this.registerForm.controls.postal_code.value;
    let given_name = this.registerForm.controls.given_name.value;
    let family_name = this.registerForm.controls.family_name.value;
    let opt_in = this.registerForm.controls.opt_in.value;
    let locale = this.getLocale(); // get proper locale
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
      .then((data) => {
        //Sign User Automatically
        const credentials: ICredentials = { username: username, password: password, firstTime: true };
        this.signIn.emit(credentials);
        
        this.snackBar.open($localize`Congrats! Your profile has been created. Now you can save your personalized meal plans after you build them. See you in the kitchen!`, null, { duration: 4500 });
        this.checkDrop();
        //End Sign user In automatically
      })
      .catch(err => {
        this.snackBar.open($localize`Oops an error has occured`, null, { duration: 2500 });
      });
  }//End signUp function

  async checkDrop() {
    if (this.route.snapshot.queryParams['drop']) {
      const dropSharedId = this.route.snapshot.queryParams['drop'];
      this.thirdPartyService.handleDropAction(dropSharedId);
    }

  }

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
      const birthdate = new Date(this.registerForm.controls.birthdate.value)
      attributes['birthdate'] = birthdate.toJSON().slice(0,10);;
    }
    let result = await Auth.updateUserAttributes(user, attributes)
      .then(res => {
        this.snackBar.open($localize`Profile info successfully updated.`, null, { duration: 3000 });
      })
      .catch(err => {
        this.snackBar.open($localize`Oops an error has occured`, null, { duration: 3000 });//Show err message
      });
    this.adobeDtbTracking.updateInformation();
  }

  signOut() {
    this.adobeDtbTracking.signout();
    Auth.signOut()
      .then(data => {
        this.accountService.loggedIn = false;
        this.router.navigate(['/'], { queryParamsHandling: "preserve" });
      })
      .catch(err => {
        alert(err.message);
      });

  }

  goBack() {
    this.back.emit();
  }
}
