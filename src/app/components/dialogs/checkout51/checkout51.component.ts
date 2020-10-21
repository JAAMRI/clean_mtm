import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-checkout51',
  templateUrl: './checkout51.component.html',
  styleUrls: ['./checkout51.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class Checkout51Component implements OnInit {
  pinCode: number;

  constructor(
    public dialogRef: MatDialogRef<Checkout51Component>,
    @Inject(MAT_DIALOG_DATA) public data: {pinCode: number}) { }

  ngOnInit(): void {
    this.pinCode = this.data.pinCode;
  }

  unlockOffers() {
    this.dialogRef.close({unlockOffers: true})
  }

}
