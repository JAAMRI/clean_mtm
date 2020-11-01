import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import Auth from '@aws-amplify/auth';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdobeDtbTracking } from '../../../app/services/adobe_dtb_tracking.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ChangePasswordComponent implements OnInit {

  securityForm: FormGroup;
  @Input() isMobile: boolean;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    public adobeDtbTracking: AdobeDtbTracking
  ) { }

  ngOnInit() {
    this.buildSecurityForm();
    //  initially build our reactive form
  }

  buildSecurityForm() {
    this.securityForm = this.fb.group({
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      newPassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
      confirmPassword: new FormControl('', [Validators.required, Validators.minLength(6)])
    }, { validator: this.mustMatch('newPassword', 'confirmPassword') })
    // use this validator to match passwords
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

  async changePassword() {
    Auth.currentAuthenticatedUser()
      .then(user => {
        this.adobeDtbTracking.passwordReset('Profile page');
        return Auth.changePassword(user, this.securityForm.controls.password.value, this.securityForm.controls.newPassword.value);
      })
      .then(data => {
        this.snackBar.open("Password successfully changed!", null, { duration: 2500 });
      })
      .catch(err => {
        this.snackBar.open('Error changing password. Please try again later', null, { duration: 2500 });
      });

  }
}
