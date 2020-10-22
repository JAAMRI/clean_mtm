import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { Checkout51Component } from './checkout51.component';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { MatSnackBarModule } from '@angular/material/snack-bar';


@NgModule({
  declarations: [Checkout51Component],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    ClipboardModule,
    MatIconModule,
    MatSnackBarModule
  ],
  entryComponents: [Checkout51Component],
  exports: [Checkout51Component]
})
export class Checkout51Module { }
