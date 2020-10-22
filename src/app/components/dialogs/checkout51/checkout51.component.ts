import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-checkout51',
  templateUrl: './checkout51.component.html',
  styleUrls: ['./checkout51.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class Checkout51Component implements OnInit {
  pinCode: string;

  constructor(
    public dialogRef: MatDialogRef<Checkout51Component>,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: {pinCode: string}) { }

  ngOnInit(): void {
    this.pinCode = this.data.pinCode;
  }

  onCodeCopiedToClipboard() {
    this.snackBar.open('Code copied to clipboard!', null, {duration: 3000})
  }

  unlockOffers() {
    this.dialogRef.close({unlockOffers: true})
  }

}
