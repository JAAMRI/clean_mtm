import { Component, OnInit, Output, EventEmitter, Input, LOCALE_ID, Inject } from '@angular/core';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-desktop-toolbar',
  templateUrl: './desktop-toolbar.component.html',
  styleUrls: ['./desktop-toolbar.component.scss']
})
export class DesktopToolbarComponent implements OnInit {
  @Output() navigate = new EventEmitter<string>();
  @Output() onSignOutClicked = new EventEmitter<string>();
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

}
