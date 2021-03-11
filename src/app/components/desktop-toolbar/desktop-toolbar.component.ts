import { Component, OnInit, Output, EventEmitter, Input, LOCALE_ID, Inject, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-desktop-toolbar',
  templateUrl: './desktop-toolbar.component.html',
  styleUrls: ['./desktop-toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class DesktopToolbarComponent implements OnInit {
  @Output() navigate = new EventEmitter<string>();
  @Output() onSignOutClicked = new EventEmitter<string>();
  @Output() onSignInClicked = new EventEmitter<string>();
  @Input() activePage: string;
  @Input() loggedIn: boolean;
  mainImage = this.locale === 'fr' ? environment.frenchImage : environment.englishImage

  constructor(@Inject(LOCALE_ID) public locale: string
  ) { }

  ngOnInit(): void {
  }

  emitNavigation(link: string) {
    this.navigate.emit(link);
  }

  signOut() {
    this.onSignOutClicked.emit();
  }

  signIn() {
    this.onSignInClicked.emit();
  }
}
