import { Component, Inject, LOCALE_ID, OnInit, ViewEncapsulation } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from "@angular/router";
import Auth from '@aws-amplify/auth';
import { Subject } from 'rxjs';
import { AccountService } from '../../../../../app/services/account/account.service';
import { AdobeDtbTracking } from '../../../../../app/services/adobe_dtb_tracking.service';
import { environment } from '../../../../../environments/environment';
import { ICredentials } from '../../../../interfaces/auth/credentials';
import { PinterestTrackingService } from '../../../../services/pinterest-tracking.service';
import { ThirdPartyService } from '../../../../services/third-party.service';
import { PasswordErrorMatcher, RegisterForm } from '../auth.forms';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RegisterComponent implements OnInit {

  passwordMatcher = new PasswordErrorMatcher();

  loadPinterestNoScript: boolean;
  unsubscribeAll = new Subject();
  loading = false;
  registerForm = RegisterForm;

  constructor(
    private accountService: AccountService,
    private snackBar: MatSnackBar,
    private router: Router,
    private thirdPartyService: ThirdPartyService,
    private route: ActivatedRoute,
    public adobeDtbTracking: AdobeDtbTracking,
    public pinterestService: PinterestTrackingService,
    @Inject(LOCALE_ID) private locale: string
  ) {
  }

  ngOnInit() {
    this.patchRegisterFormWithEmail()
  }

  patchRegisterFormWithEmail() {
    if (this.route.snapshot.queryParams['email']) {
      const email = this.route.snapshot.queryParams['email'];
      this.registerForm.patchValue({ email });
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


  getLocale() {
    // return a mapped locale on how MTM wants it
    if (this.locale === 'fr') {
      return 'fr-CA'
    } else {
      return 'en-CA'
    }
  }

  async signup() {
    if (environment.production) {
      this.loadPinterestNoScript = true;
      this.pinterestService.trackSignup();
    }
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
        'custom:postal_code': postal_code.toString()
      }
    })
      .then((data) => {
        //Sign User Automatically
        const credentials: ICredentials = { username: username, password: password, firstTime: true };
        this.signIn(credentials);

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
        this.adobeDtbTracking.firstTimeUser('New Registration');
      } else {
        this.adobeDtbTracking.returningUser();
      }
      this.accountService.emitAuthStateChanged();
      this.accountService.setLoggedIn(true);
    } catch (err) {
      console.log(err);
      this.snackBar.open($localize`Sorry! We could not sign you in at this time. PLease try again later.`, null, { duration: 2500 });
      this.loading = false;
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
      attributes['birthdate'] = birthdate.toJSON().slice(0, 10);;
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
    this.router.navigate(['/auth/login'], { queryParamsHandling: 'preserve' });
  }
}
