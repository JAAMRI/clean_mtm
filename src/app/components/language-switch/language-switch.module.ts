import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

import { LanguageSwitchComponent } from './language-switch.component';

@NgModule({
  declarations: [LanguageSwitchComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatSelectModule
  ],
  exports: [LanguageSwitchComponent]
})
export class LanguageSwitchModule { }
