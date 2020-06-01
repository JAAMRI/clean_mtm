import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { LayoutRouting } from './layout.routing';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MobileMenuModule } from '../../components/mobile-menu/mobile-menu.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ToolbarModule } from '../../components/toolbar/toolbar.module';

@NgModule({
  declarations: [LayoutComponent],
  imports: [
    CommonModule,
    RouterModule,
    LayoutRouting,
    MatMenuModule,
    MatSidenavModule,
    MobileMenuModule,
    MatToolbarModule,
    ToolbarModule
  ]
})
export class LayoutModule { }
