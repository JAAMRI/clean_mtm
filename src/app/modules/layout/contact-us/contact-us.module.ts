import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactUsComponent } from './contact-us.component';
import { ContactUsRouting } from './contact-us.routing';
import { MatFormFieldModule, MatExpansionModule, MatInputModule, MatIconModule, MatButtonModule } from '@angular/material';

@NgModule({
  declarations: [ContactUsComponent],
  imports: [
    CommonModule,
    ContactUsRouting,
    MatFormFieldModule,
    MatExpansionModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule

  ]
})
export class ContactUsModule { }
