import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import Auth from '@aws-amplify/auth';
import { AdobeDtbTracking } from '../../../../services/adobe_dtb_tracking.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ForgotPasswordComponent implements OnInit {

  @Output() update = new EventEmitter();
  @Output() validate = new EventEmitter();
  @Output() back = new EventEmitter();
  @Input() emailValidated: boolean;
  @Input() invalidEmail: boolean;
  @Input() invalidCode: boolean;

  forgotPasswordForm: FormGroup;

  constructor(
    private snackBar: MatSnackBar,
    private fb: FormBuilder,
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
    this.back.emit();
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
        this.validate.emit(email);
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
    this.update.emit({ email, code, password });
    this.adobeDtbTracking.passwordReset('Sign In popup');
  }

}
