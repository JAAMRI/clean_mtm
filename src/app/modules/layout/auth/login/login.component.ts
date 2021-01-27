import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import Auth from '@aws-amplify/auth';
import { AccountService } from 'src/app/services/account/account.service';
import { AdobeDtbTracking } from 'src/app/services/adobe_dtb_tracking.service';
import { ICredentials } from '../../../../interfaces/auth/credentials';
import { LoginForm } from '../auth.forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm = LoginForm;
  loading: boolean;
  email = new FormControl('', [Validators.required, Validators.email]);

  constructor(
    private accountService: AccountService,
    private router: Router, private snackBar: MatSnackBar, private route: ActivatedRoute, private adobeDtbTracking: AdobeDtbTracking) { }

  register() {
    this.router.navigate(['/auth/register'], { queryParamsHandling: 'merge', queryParams: { email: this.email.value } });
  }

  forgotPassword() {
    this.router.navigate(['/auth/forgot-password'], { queryParamsHandling: 'preserve' });
    this.adobeDtbTracking.anchorLink('Link leading to reset password page on sign in popup');
  }

  async login() {
    const username = this.loginForm.get('email').value;
    const password = this.loginForm.get('password').value;
    const credentials: ICredentials = {
      username: username,
      password: password,
    }

    try {
      const { username, password } = credentials;
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
      
      this.adobeDtbTracking.returningUser();
      
      this.accountService.emitAuthStateChanged();
      this.accountService.setLoggedIn(true);
    } catch (err) {
      console.log(err);
      this.snackBar.open($localize`Sorry! We could not sign you in at this time. PLease try again later.`, null, { duration: 2500 });
      this.loading = false;
    }
  }

}
