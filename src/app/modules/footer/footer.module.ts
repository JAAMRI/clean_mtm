import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FooterComponent } from './footer.component';


@NgModule({
  declarations: [FooterComponent],
  imports: [
    CommonModule,
    MatTooltipModule
  ],
  exports: [FooterComponent]
})
export class FooterModule { }
