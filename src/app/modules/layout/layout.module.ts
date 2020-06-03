import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';
import { DesktopToolbarModule } from '../../components/desktop-toolbar/desktop-toolbar.module';
import { MobileMenuModule } from '../../components/mobile-menu/mobile-menu.module';
import { ToolbarModule } from '../../components/toolbar/toolbar.module';
import { LayoutComponent } from './layout.component';
import { LayoutRouting } from './layout.routing';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [LayoutComponent],
  imports: [
    CommonModule,
    RouterModule,
    LayoutRouting,
    MatSidenavModule,
    MobileMenuModule,
    MatIconModule,
    MatButtonModule,
    ToolbarModule,
    DesktopToolbarModule
  ]
})
export class LayoutModule { }
