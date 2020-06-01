import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatStepperModule } from '@angular/material/stepper';
import { PersonalInfoModule } from '../../personal-info/personal-info.module';
import { UserFormComponent } from './user-form.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BreadcrumbsModule } from '../../breadcrumbs/breadcrumbs.module';

@NgModule({
  declarations: [UserFormComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    ReactiveFormsModule,
    MatInputModule,
    MatStepperModule,
    MatSnackBarModule,
    PersonalInfoModule,
    FormsModule,
    BreadcrumbsModule
  ],
  entryComponents: [UserFormComponent],
  exports: [UserFormComponent]
})
export class UserFormModule { }
