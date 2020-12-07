import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ToolbarModule } from '../../../components/toolbar/toolbar.module';
import { PipesModule } from '../../../pipes/pipes.module';
import { PinterestTrackingService } from '../../../services/pinterest-tracking.service';
import { ThirdPartyService } from '../../../services/third-party.service';
import { AuthComponent } from './auth.component';
import { AuthRouting } from './auth.routing';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';


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
    MatSnackBarModule


  ], providers: [PinterestTrackingService, ThirdPartyService]
})
export class AuthModule { }
