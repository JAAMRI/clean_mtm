import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterModule } from '@angular/router';
import { PinterestTrackingService } from 'src/app/services/pinterest-tracking.service';
import { ThirdPartyService } from 'src/app/services/third-party.service';
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
        RouterModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatInputModule,
        MatSnackBarModule,
        HttpClientModule,
        MatCheckboxModule
    ], 
    providers: [ThirdPartyService, PinterestTrackingService]
})
export class RegisterModule { }
