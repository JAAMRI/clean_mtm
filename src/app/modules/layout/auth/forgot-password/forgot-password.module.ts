import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ForgotPasswordComponent } from './forgot-password.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ForgotPasswordComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  exports: [ForgotPasswordComponent]
})
export class ForgotPasswordModule { }
