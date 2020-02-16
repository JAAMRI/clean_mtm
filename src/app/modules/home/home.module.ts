import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { UserFormModule } from '../../components/dialogs/user-form/user-form.module';
import { ForgotPasswordModule } from '../../components/forgot-password/forgot-password.module';
import { OnBoardModule } from '../../components/on-board/on-board.module';
import { HomeComponent } from './home.component';
import { HomeRouting } from './home.routing';
import { HowItWorksComponent } from './how-it-works/how-it-works.component';

@NgModule({
  declarations: [HomeComponent, HowItWorksComponent],
  imports: [
    CommonModule,
    HomeRouting,
    RouterModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    OnBoardModule,
    MatDialogModule,
    UserFormModule,
    ForgotPasswordModule,
    SlickCarouselModule,
    MatIconModule
  ]
})
export class HomeModule { }
