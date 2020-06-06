import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { PersonalInfoModule } from '../../components/personal-info/personal-info.module';
import { ProfileComponent } from './profile.component';
import { ProfileRouting } from './profile.routing';
import { ChangePasswordModule } from '../../components/change-password/change-password.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ProfileComponent],
  imports: [
    CommonModule,
    MatIconModule,
    ProfileRouting,
    MatButtonModule,
    MatSnackBarModule,
    MatTabsModule,
    MatCheckboxModule,
    ChangePasswordModule,
    PersonalInfoModule,
    ReactiveFormsModule
  ]
})
export class ProfileModule { }
