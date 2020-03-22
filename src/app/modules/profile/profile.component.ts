import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer, Title } from '@angular/platform-browser';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PreferencesService } from '../../services/preferences/preferences.service';
import { BREAKPOINTS } from '../../utilities/breakpoints';
import { ProfileIcons } from './profile-icons';
import { FormGroup, FormControl } from '@angular/forms';
import { Auth } from 'aws-amplify';
import { SeoService } from '../../services/seo.service';
import { AdobeDtbTracking } from '../../services/adobe_dtb_tracking.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProfileComponent {
  profileIcons = ProfileIcons;
  userPreferences: string;
  isWeb: boolean;
  isHandsetPortrait: boolean;
  isHandsetLandscape: boolean;
  unsubscribeAll = new Subject();
  opt_in_modify = false;

  notificationsForm = new FormGroup({
    opt_in: new FormControl(false)
  })

  constructor(private matIconRegistry: MatIconRegistry,
    private preferencesService: PreferencesService,
    private breakpointObserver: BreakpointObserver,
    private snackBar: MatSnackBar,
    private sanitizer: DomSanitizer,
    private seo: SeoService, private title: Title, public adobeDtbTracking: AdobeDtbTracking) {
    this.profileIcons.forEach((preference) => {
      this.matIconRegistry.addSvgIcon(preference.name, this.sanitizer.bypassSecurityTrustResourceUrl(preference.icon));
    });
    this.observeBreakpoints();
    this.title.setTitle('MealsThatMatter – Profile'); //updating page title
    this.seo.generateTags({
      title: 'MealsThatMatter – Profile',
      description: 'View your profile.',
      image: 'https://mealsthatmatter-asset.s3.amazonaws.com/mealsthatmatter.com.assets/icons/icon-384x384.png',
      slug: '/recipes/profile'
    })
  }

  ngOnInit() {
    setTimeout(() => {
      this.adobeDtbTracking.page_load("profile page");
    },
      5000);
    this.setOptInAttribute();
  }

  async setOptInAttribute() {
    Auth.currentAuthenticatedUser({
      bypassCache: true  // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
    }).then(currentUser => {
      if (currentUser.attributes['custom:opt_in'] == false) {
        console.log(currentUser.attributes['custom:opt_in']);
        this.opt_in_modify = true;
        this.notificationsForm.controls.opt_in.setValue(currentUser.attributes['custom:opt_in']);
      }
    })
      .catch(err => console.log(err.message));
  }

  savePreferences(preferences: string) {
    // save preferences in backend
    this.preferencesService.savePreferences(preferences).then((_) => this.snackBar.open('Preferences saved', null, { duration: 3000 }))
  }

  observeBreakpoints() {
    // breakpoints
    this.breakpointObserver.observe(BREAKPOINTS).pipe(takeUntil
      (this.unsubscribeAll)).subscribe((result: BreakpointState) => {
        this.isWeb = this.breakpointObserver.isMatched('(min-width: 960px)');
        this.isHandsetPortrait = this.breakpointObserver.isMatched('(max-width: 599.99px) and (orientation: portrait)');
        this.isHandsetLandscape = this.breakpointObserver.isMatched('(max-width: 959.99px) and (orientation: landscape)');
      });
  }

  async optInUpdate() {
    let opt_in = this.notificationsForm.controls.opt_in.value;// the click happens before the value change, updated
    let user = await Auth.currentAuthenticatedUser();

    if (opt_in) {
      this.adobeDtbTracking.tagging_optin();
    } else {
      this.adobeDtbTracking.tagging_optout();
    }
    let result = await Auth.updateUserAttributes(user, { 'custom:opt_in': opt_in.toString() })
      .then(res => {
        this.snackBar.open("Notifications successfully updated.", null, { duration: 3000 });
        if (opt_in) {
          this.opt_in_modify = false;
        }
      })
      .catch(err => {
        this.snackBar.open(err.message, null, { duration: 3000 });//Show err message
      });

  }

}
