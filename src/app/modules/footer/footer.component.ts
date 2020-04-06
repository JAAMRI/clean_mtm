import { AfterViewChecked, Component, ElementRef, Input, ViewChild, ChangeDetectorRef, HostBinding, OnInit, AfterViewInit } from '@angular/core';
import { AdobeDtbTracking } from '../../services/adobe_dtb_tracking.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements AfterViewInit {

  @Input() isPortrait: boolean;
  @Input() isHandsetLandscape: boolean;
  @Input() setFooterHeight: Function;
  @ViewChild('footer', { static: true }) footer: ElementRef;
  @HostBinding('style.height.px') height;
  footerHeight: number;

  constructor(public adobeDtbTracking: AdobeDtbTracking,
    private cdref: ChangeDetectorRef
  ) { }

  // lazy loaded component
  ngAfterViewInit() {
    if (this.height !== this.footer.nativeElement.offsetHeight) {
      // set the height of the footer so app container can scroll over it after the view is init.
      setTimeout(() => this.height = this.footer.nativeElement.offsetHeight, 0);
      // do this to get rid of ngafterviewinitchecked error
    }
  }


}
