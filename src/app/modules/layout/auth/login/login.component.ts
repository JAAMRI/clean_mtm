import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ICredentials } from '../../../../interfaces/auth/credentials';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @Input() loginForm: FormGroup;
  @Input() loading: boolean;
  @Input() emailForm: FormGroup;
  @Output() register = new EventEmitter<void>();
  @Output() login = new EventEmitter<ICredentials>();
  @Output() forgotPassword = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

  emitRegister() {
    this.register.emit();
  }

  emitForgotPassword() {
    this.forgotPassword.emit();
  }

  emitLogin() {
    const username = this.loginForm.get('email').value;
    const password = this.loginForm.get('password').value;
    const credentials: ICredentials = {
      username: username,
      password: password,
    }
    this.login.emit(credentials);
  }

}
