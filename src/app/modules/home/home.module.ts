import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';
import { MobileMenuModule } from '../../components/mobile-menu/mobile-menu.module';
import { HomeComponent } from './home.component';
import { HomeRouting } from './home.routing';
import { HowItWorksModule } from './how-it-works/how-it-works.module';
import { OnBoardModule } from './on-board/on-board.module';
import { ReclaimWeeknightCookingModule } from './reclaim-weeknight-cooking/reclaim-weeknight-cooking.module';
import { YouWillLoveThisModule } from './you-will-love-this/you-will-love-this.module';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRouting,
    RouterModule,
    MatButtonModule,
    MatIconModule,
    OnBoardModule,
    MatSidenavModule,
    MobileMenuModule,
    YouWillLoveThisModule,
    ReclaimWeeknightCookingModule,
    HowItWorksModule
  ]
})
export class HomeModule { }
