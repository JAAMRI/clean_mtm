import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';

import { DesktopToolbarComponent } from './desktop-toolbar.component';
import { LanguageSwitchModule } from '../language-switch/language-switch.module';

@NgModule({
  declarations: [DesktopToolbarComponent],
  imports: [
    CommonModule,
    MatMenuModule,
    MatButtonModule,
    MatToolbarModule,
    LanguageSwitchModule
  ],
  exports: [DesktopToolbarComponent]
})
export class DesktopToolbarModule { }
