import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { LanguageSwitchModule } from '../language-switch/language-switch.module';
import { MobileMenuComponent } from './mobile-menu.component';

@NgModule({
  declarations: [MobileMenuComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatListModule,
    MatMenuModule,
    MatDialogModule, 
    LanguageSwitchModule
  ],
  exports: [MobileMenuComponent]
})
export class MobileMenuModule { }
