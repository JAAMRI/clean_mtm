import { ChangeDetectionStrategy, Component, EventEmitter, Inject, Input, LOCALE_ID, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatIconRegistry } from '@angular/material/icon';
import { ErrorStateMatcher } from '@angular/material/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from "@angular/router";
import { Auth } from 'aws-amplify';
import { Subject } from 'rxjs';
import { AccountService } from '../../../app/services/account/account.service';
import { MealPlanService } from '../../../app/services/meal-plan/meal-plan.service';
import { AdobeDtbTracking } from '../../../app/services/adobe_dtb_tracking.service';

// Error state matching class for confirm password
class passwordErrorMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return control.dirty && form.invalid;
  }
}

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class PersonalInfoComponent implements OnInit {
  passwordMatcher = new passwordErrorMatcher();

  userForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    confirm_password: new FormControl('', [Validators.required]),
    given_name: new FormControl('', Validators.required),
    family_name: new FormControl('', Validators.required),
    birthdate: new FormControl(''),
    opt_in: new FormControl(),
    postal_code: new FormControl('')
  }, {
      validators: this.checkPasswords
    }
  );

  checkPasswords(userGroup: FormGroup) {
    const condition = userGroup.get('password').value !== userGroup.get('confirm_password').value;
    return condition ? { NotSamePassword: true } : null;

  }

  @Output() signIn = new EventEmitter<{ username: string, password: string, firstTimeSignIn: boolean }>();

  unsubscribeAll = new Subject();
  loading = false;
  viewMore = false;
  // @Input() email: string;
  @Input() onProfilePage: boolean;
  @Input() isMobile: boolean;
  @Output() back = new EventEmitter();
  constructor(
    private matIconRegistry: MatIconRegistry,
    private accountService: AccountService,
    private sanitizer: DomSanitizer,
    private snackBar: MatSnackBar,
    private router: Router,
    private mealPlanService: MealPlanService,
    public adobeDtbTracking: AdobeDtbTracking,
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

        this.userForm.controls.family_name.setValue(currentUser.attributes.family_name);
        this.userForm.controls.given_name.setValue(currentUser.attributes.given_name);
        this.userForm.controls.email.setValue(currentUser.attributes.email);
        if (currentUser.attributes.birthdate) {
          const userBirthdate = new Date(currentUser.attributes.birthdate);
          userBirthdate.setMinutes(userBirthdate.getMinutes() + userBirthdate.getTimezoneOffset())
          this.userForm.controls.birthdate.setValue(userBirthdate);
        }
        this.userForm.controls.postal_code.setValue(currentUser.attributes['custom:postal_code']);
      })
        .catch(err => {
          console.log(err);
          this.accountService.loggedIn = false;
          this.router.navigateByUrl("./", /* Removed unsupported properties by Angular migration: queryParamsHandling. */ {});
        }
        );
    } catch (err) {
      console.log(err);
    }
  }

  setEmailFromStep1(emailFromLastStep: string) {
    this.userForm.controls.email.setValue(emailFromLastStep);
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
    let username = this.userForm.controls.email.value.toLowerCase();
    let password = this.userForm.controls.password.value;
    let postal_code = this.userForm.controls.postal_code.value;
    let given_name = this.userForm.controls.given_name.value;
    let family_name = this.userForm.controls.family_name.value;
    let opt_in = this.userForm.controls.opt_in.value;
    let website =  this.locale === 'fr' ? "chaquerepascompte.com" : "mealsthatmatter.com";
    let locale = this.getLocale(); // get proper locale

    Auth.signUp({
      username,
      password,
      attributes: {
        'given_name': given_name,
        'family_name': family_name,
        'locale': locale,
        'custom:opt_in': opt_in ? opt_in.toString() : 'false',
        'website': website,
        'updated_at': new Date().getTime().toString(),
        'custom:postal_code': postal_code.toString()
      }
    })
      .then(data => {
        //Sign User Automatically
        this.signIn.emit({ username: username, password: password, firstTimeSignIn: true })

        this.snackBar.open($localize`Congrats! Your profile has been created. Now you can save your personalized meal plans after you build them. See you in the kitchen!`, null, { duration: 4500 });
        //End Sign user In automatically
      })
      .catch(err => {
        this.snackBar.open($localize`Oops an error has occured`, null, { duration: 2500 });
      });
  }//End signUp function

  async update() {
    let user = await Auth.currentAuthenticatedUser();
    let attributes = {
      'email': this.userForm.controls.email.value,
      'family_name': this.userForm.controls.family_name.value,
      'given_name': this.userForm.controls.given_name.value,
      'updated_at': new Date().getTime().toString()
    }
    if (this.userForm.controls.postal_code.value) {
      attributes['custom:postal_code'] = this.userForm.controls.postal_code.value;
    }
    if (this.userForm.controls.birthdate.value) {
      const birthdate = new Date(this.userForm.controls.birthdate.value)
      attributes['birthdate'] = birthdate.toJSON().slice(0,10);
    }
    let result = await Auth.updateUserAttributes(user, attributes)
      .then(res => {
        this.snackBar.open($localize`Profile info successfully updated.`, null, { duration: 3000 });
      })
      .catch(err => {
        this.snackBar.open($localize`Error updating profile`, null, { duration: 3000 });//Show err message
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
