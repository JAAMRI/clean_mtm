import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { ToolbarModule } from '../../../app/components/toolbar/toolbar.module';
import { MobileMenuModule } from '../../../app/components/mobile-menu/mobile-menu.module';
import { RouterModule } from '@angular/router';
import { LayoutRouting } from './layout.routing';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';

@NgModule({
  declarations: [LayoutComponent],
  imports: [
    CommonModule,
    MobileMenuModule,
    ToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    RouterModule,
    LayoutRouting
  ]
})
export class LayoutModule { }
