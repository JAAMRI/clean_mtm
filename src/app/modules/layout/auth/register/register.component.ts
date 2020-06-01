import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  @Input() registerForm: FormGroup;
  @Output() navigate = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  routeToRegisterPage() {
    this.navigate.emit();
  }



}
