import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { MatCheckboxModule } from '@angular/material/checkbox';

import { HttpClientModule } from '@angular/common/http';
import { TruncatePipe } from './pipes/truncate.pipe';
import { SafeHtmlPipe } from './pipes/safehtml.pipe';
import { FloorPipe } from './pipes/floor.pipe';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatCheckboxModule,
  ],
  declarations: [
    TruncatePipe,
    SafeHtmlPipe,
    FloorPipe,
  ],
  exports: [
    TruncatePipe,
    SafeHtmlPipe,
    FloorPipe

  ]
})

export class SharedModule {

}
