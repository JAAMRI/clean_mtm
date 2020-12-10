import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterModule } from '@angular/router';
import { DesktopToolbarModule } from '../../components/desktop-toolbar/desktop-toolbar.module';
import { MobileMenuModule } from '../../components/mobile-menu/mobile-menu.module';
import { ToolbarModule } from '../../components/toolbar/toolbar.module';
import { AuthGuard } from '../../guards/auth.guard';
import { LayoutComponent } from './layout.component';
import { LayoutRouting } from './layout.routing';

@NgModule({
  declarations: [LayoutComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatSidenavModule,
    MobileMenuModule,
    MatIconModule,
    MatButtonModule,
    ToolbarModule,
    DesktopToolbarModule,
    MatSnackBarModule,
    LayoutRouting,
  ],
  providers: [AuthGuard]
})
export class LayoutModule { }
