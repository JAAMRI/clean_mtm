import { ChangeDetectionStrategy, Component, HostListener, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatIconRegistry } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer, Title } from '@angular/platform-browser';
import { Auth } from 'aws-amplify';
import { Subject } from 'rxjs';
import { AdobeDtbTracking } from '../../services/adobe_dtb_tracking.service';
import { SeoService } from '../../services/seo.service';
import { ProfileIcons } from './profile-icons';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class ProfileComponent {
  profileIcons = ProfileIcons;
  unsubscribeAll = new Subject();
  optInModify = false;
  isMobile = window.innerWidth < 768;
  notificationsForm = new FormGroup({
    optIn: new FormControl(false)
  })

  constructor(private matIconRegistry: MatIconRegistry,
    private snackBar: MatSnackBar,
    private sanitizer: DomSanitizer,
    private seo: SeoService, private title: Title, public adobeDtbTracking: AdobeDtbTracking) {
    this.profileIcons.forEach((preference) => {
      this.matIconRegistry.addSvgIcon(preference.name, this.sanitizer.bypassSecurityTrustResourceUrl(preference.icon));
    });
    this.title.setTitle('MealsThatMatter – Profile'); //updating page title
    this.seo.generateTags({
      title: $localize`My Account | Meals That Matter`,
      description: 'View your profile.',
      image: 'https://mealsthatmatter-asset.s3.amazonaws.com/mealsthatmatter.com.assets/icons/icon-384x384.png',
      slug: '//profile'
    })
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.isMobile = event.target.innerWidth < 768;
  }



  ngOnInit() {
    setTimeout(() => {
      this.adobeDtbTracking.pageLoad("profile page");
    },
      5000);
    this.setOptInAttribute();
  }

  async setOptInAttribute() {
    Auth.currentAuthenticatedUser({
      bypassCache: true  // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
    }).then(currentUser => {
      if (currentUser.attributes['custom:opt_in'] == false) {
        this.optInModify = true;
        if (this.notificationsForm.controls.opt_in) {
          this.notificationsForm.controls.opt_in.setValue(currentUser.attributes['custom:opt_in']);

        }
      }
    })
      .catch(err => console.log(err.message));
  }

  async optInUpdate() {
    let opt_in = this.notificationsForm.controls.opt_in.value;// the click happens before the value change, updated
    let user = await Auth.currentAuthenticatedUser();

    if (opt_in) {
      //this.adobeDtbTracking.taggingOptin();
    } else {
      //this.adobeDtbTracking.taggingOptout();
    }
    let result = await Auth.updateUserAttributes(user, { 'custom:opt_in': opt_in.toString() })
      .then(res => {
        this.snackBar.open($localize`Notifications successfully updated.`, null, { duration: 3000 });
        if (opt_in) {
          this.optInModify = false;
        }
      })
      .catch(err => {
        this.snackBar.open(err.message, null, { duration: 3000 });//Show err message
      });

  }

}
