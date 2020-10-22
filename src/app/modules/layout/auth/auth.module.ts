import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ToolbarModule } from '../../../components/toolbar/toolbar.module';
import { AuthComponent } from './auth.component';
import { AuthRouting } from './auth.routing';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { PipesModule } from '../../../pipes/pipes.module';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { PinterestTrackingService } from '../../../services/pinterest-tracking.service';
import { MatDialogModule } from '@angular/material/dialog';
import { Checkout51Module } from '../../../components/dialogs/checkout51/checkout51.module';



@NgModule({
  declarations: [AuthComponent, LoginComponent, RegisterComponent, ForgotPasswordComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    ToolbarModule,
    MatIconModule,
    AuthRouting,
    ReactiveFormsModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatProgressSpinnerModule,
    MatCheckboxModule,
    MatTooltipModule,
    PipesModule,
    MatDialogModule,
    Checkout51Module
  ], providers: [PinterestTrackingService]
})
export class AuthModule { }
