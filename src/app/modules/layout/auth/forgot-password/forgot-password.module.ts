import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterModule } from '@angular/router';
import { ForgotPasswordComponent } from './forgot-password.component';
import { ForgotPasswordRouting } from './forgot-password.routing';

@NgModule({
    declarations: [ForgotPasswordComponent],
    imports: [
        CommonModule,
        ForgotPasswordRouting,
        MatIconModule,
        MatButtonModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        RouterModule,
        MatInputModule,
        MatSnackBarModule
    ], 
    providers: []
})
export class ForgotPasswordModule { }
