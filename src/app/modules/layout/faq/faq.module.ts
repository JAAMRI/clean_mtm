import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FaqComponent } from './faq.component';
import { FaqRouting } from './faq.routing';
import { MatFormFieldModule, MatExpansionModule, MatInputModule, MatIconModule, MatButtonModule } from '@angular/material';

@NgModule({
  declarations: [FaqComponent],
  imports: [
    CommonModule,
    FaqRouting,
    MatFormFieldModule,
    MatExpansionModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule

  ]
})
export class FaqModule { }
