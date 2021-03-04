import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Auth } from 'aws-amplify';
import { AccountService } from 'src/app/services/account/account.service';
import { AdobeDtbTracking } from '../../../../services/adobe_dtb_tracking.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class ForgotPasswordComponent implements OnInit {

  @Output() update = new EventEmitter();
  @Output() back = new EventEmitter();
  @Input() emailValidated: boolean;
  @Input() invalidEmail: boolean;
  @Input() invalidCode: boolean;

  forgotPasswordForm: FormGroup;

  constructor(
    private snackBar: MatSnackBar,
    private fb: FormBuilder,
    private accountService: AccountService,
    private router: Router,
    private route: ActivatedRoute,
    public adobeDtbTracking: AdobeDtbTracking
  ) { }

  ngOnInit() {
    this.buildForm()
  }

  buildForm() {
    this.forgotPasswordForm = this.fb.group({
      email: new FormControl('', [Validators.email, Validators.required]),
      code: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      confirmPassword: new FormControl('')
    }, { validator: this.mustMatch('password', 'confirmPassword') })
    // use this validator to match passwords
  }

  goBack() {
    this.router.navigate(['/auth/login'], { queryParamsHandling: 'preserve' });
  }

  // Used for password match validation
  mustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        // return if another validator has already found an error on the matchingControl
        return;
      }

      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    }
  }

  validateEmail() {
    const email = this.forgotPasswordForm.get('email').value.toLowerCase();
    if (email == "") {
      this.snackBar.open($localize`Sorry! Email address is required`, null, { duration: 2500 });
      return;
    }
    Auth.forgotPassword(email)
      .then(data => {
        this.emailValidated = true;
        this.snackBar.open($localize`A code has been sent to your email, please enter it for verification purposes!`, null, { duration: 3000 })

      })
      .catch(err => {
        console.log(err)
        this.snackBar.open($localize`Oops an error has occured`, null, { duration: 2500 });
      });
  }

  validateCodeAndPassword() {
    if (this.forgotPasswordForm.get('code').errors) {
      if (this.forgotPasswordForm.get('code').errors.hasOwnProperty('required')) { this.snackBar.open($localize`Code is required`, null, { duration: 1500 }); return; }
    }
    if (this.forgotPasswordForm.get('password').errors) {
      if (this.forgotPasswordForm.get('password').errors.hasOwnProperty('required')) { this.snackBar.open($localize`Password is required`, null, { duration: 1500 }); return; }
      if (this.forgotPasswordForm.get('password').errors.hasOwnProperty('minlength')) { this.snackBar.open($localize`Password must be at least 8 characters`, null, { duration: 1500 }); return; }
    }
    if (this.forgotPasswordForm.get('confirmPassword').errors) {
      if (this.forgotPasswordForm.get('confirmPassword').errors.hasOwnProperty('mustMatch')) { this.snackBar.open($localize`Oops! Passwords Must Match`, null, { duration: 1500 }); return; }
    }

    const email = this.forgotPasswordForm.get('email').value.toLowerCase();
    const code = this.forgotPasswordForm.get('code').value;
    const password = this.forgotPasswordForm.get('password').value;
    this.updatePassword({ email, code, password });
    this.adobeDtbTracking.passwordReset('Sign In popup');
  }

  updatePassword(data: { email: string, code: string, password: string }) {
    const { email: username, password: newPassword, code } = data;
    Auth.forgotPasswordSubmit(username, code, newPassword)
      .then(async (_) => {
        this.snackBar.open($localize`Your password has been successfully updated`, null, { duration: 3000 })
        //Automatically sign in User
        await this.signIn({ username: username, password: newPassword })
        //
      })
      .catch(err => {
        console.log(err);
        this.snackBar.open($localize`Sorry! An error has occured updating your password`, null, { duration: 2500 });
      });
  }

  async signIn(credentials: {username: string, password: string, firstTime?: boolean}) {
    try {
      const { username, password, firstTime } = credentials;
  
      await Auth.signIn(username.toLowerCase(), password);
      if (this.route.snapshot.queryParams && this.route.snapshot.queryParams['returnUrl']) {
        // check if there is a redirectTo in the query params and redirect to this instead
        const redirectRoute = this.route.snapshot.queryParams['returnUrl'];
  
        this.router.navigateByUrl(redirectRoute, /* Removed unsupported properties by Angular migration: queryParamsHandling. */ {});
      } else {
  
        this.router.navigate(['/recipes/discover'], { queryParamsHandling: "preserve" });
      }
  
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
    }
  
  }
}
