import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { ErrorDialogComponent } from './error-dialog.component';

@NgModule({
    declarations: [ErrorDialogComponent],
    imports: [
        CommonModule,
        MatDialogModule,
        MatButtonModule,
    ],
    entryComponents: [ErrorDialogComponent],
    exports: [ErrorDialogComponent]
})
export class ErrorDialogModule { }
