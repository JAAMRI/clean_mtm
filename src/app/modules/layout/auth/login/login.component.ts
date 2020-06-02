import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @Input() loginForm: FormGroup;
  @Input() emailForm: FormGroup;
  @Output() register = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  routeToRegisterPage() {
    this.register.emit();
  }

}
