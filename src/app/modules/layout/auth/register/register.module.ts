import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { RegisterComponent } from './register.component';
import { RegisterRouting } from './register.routing';

@NgModule({
    declarations: [RegisterComponent],
    imports: [
        CommonModule,
        RegisterRouting,
        MatIconModule,
        MatButtonModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        RouterModule
    ], 
    providers: []
})
export class RegisterModule { }
