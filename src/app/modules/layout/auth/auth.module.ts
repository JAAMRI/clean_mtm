import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AuthComponent } from './auth.component';
import { AuthRouting } from './auth.routing';

@NgModule({
  declarations: [AuthComponent],
  imports: [
    CommonModule,
    AuthRouting
  ]
})
export class AuthModule { }
