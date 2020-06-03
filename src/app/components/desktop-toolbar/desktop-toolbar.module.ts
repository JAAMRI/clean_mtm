import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DesktopToolbarComponent } from './desktop-toolbar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [DesktopToolbarComponent],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatMenuModule,
    MatButtonModule
  ],
  exports: [DesktopToolbarComponent]
})
export class DesktopToolbarModule { }
