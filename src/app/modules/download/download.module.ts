import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DownloadComponent } from './download.component';
import { DownloadRouting } from './download.routing';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [DownloadComponent],
  imports: [
    CommonModule,
    DownloadRouting,
    MatButtonModule
  ]
})
export class DownloadModule { }
