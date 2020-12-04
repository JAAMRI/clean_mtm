import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { AccountService } from 'src/app/services/account/account.service';
import { LoginComponent } from './login.component';
import { LoginRouting } from './login.routing';

@NgModule({
    declarations: [LoginComponent],
    imports: [
        CommonModule,
        LoginRouting,
        MatIconModule,
        MatButtonModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        RouterModule
    ], 
    providers: []
})
export class LoginModule { }
