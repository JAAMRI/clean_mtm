import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { UserFormModule } from '../../components/dialogs/user-form/user-form.module';
import { OnBoardModule } from './on-board/on-board.module';
import { HomeComponent } from './home.component';
import { HomeRouting } from './home.routing';
import { HowItWorksComponent } from './how-it-works/how-it-works.component';
import { YouWillLoveThisComponent } from './you-will-love-this/you-will-love-this.component';
import { ReclaimWeeknightCookingComponent } from './reclaim-weeknight-cooking/reclaim-weeknight-cooking.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MobileMenuModule } from '../../components/mobile-menu/mobile-menu.module';
import { MtmSliderModule } from '../../components/mtm-slider/mtm-slider.module';

@NgModule({
  declarations: [HomeComponent, HowItWorksComponent, YouWillLoveThisComponent, ReclaimWeeknightCookingComponent],
  imports: [
    CommonModule,
    HomeRouting,
    RouterModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    OnBoardModule,
    UserFormModule,
    MatSidenavModule,
    MobileMenuModule,
    MtmSliderModule
  ]
})
export class HomeModule { }
