import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})

export class AdobeDtbTracking {
    apiHost = environment.host;
    pageLoad(name) {
        //       this.adobeDtbTracking.anchorLink(`Routing to ${link || '/recipes/discover'} from ${comingFrom}`);

        if (!environment.production) return
        // @ts-ignore
        fbq('track', 'ViewContent ' + name);
        var ev = {};
        // @ts-ignore
        ev.eventInfo = {
            // @ts-ignore
            'type': "Track Ajax Page Load",
            'eventLabel': name,
            'eventValue': 1
        };
        // @ts-ignore
        ev.category = { 'primaryCategory': "Other" }; ev.subcategory = 'Read';
        // @ts-ignore
        digitalData.event.push(ev);
        // }
    }

    pageTracking(name: string, url: string) {
        //       this.adobeDtbTracking.anchorLink(`Routing to ${link || '/recipes/discover'} from ${comingFrom}`);


        if (!environment.production) return
        // @ts-ignore
        fbq('track', 'ViewContent ' + name + ' ' + url);
        var ev = {};
        // @ts-ignore
        ev.eventInfo = {
            // @ts-ignore
            'type': ctConstants.trackEvent,
            // @ts-ignore
            'eventAction': "Link Click",
            'eventLabel': name + ' - ' + url,
            'eventValue': 1
        };
        // @ts-ignore
        ev.category = { 'primaryCategory': "Custom" };
        // @ts-ignore
        digitalData.event.push(ev);
        // }
    }

    socialMediaTracking(name, url) {
        //       this.adobeDtbTracking.anchorLink(`Routing to ${link || '/recipes/discover'} from ${comingFrom}`);


        if (!environment.production) return
        // @ts-ignore
        fbq('track', 'ViewContent' + name + ', ' + url);
        var ev = {};
        // @ts-ignore
        ev.eventInfo = {
            // @ts-ignore
            'type': ctConstants.trackEvent,
            // @ts-ignore
            'eventAction': ctConstants.clickstosocialplatforms,
            'eventLabel': name + ', ' + url,
            'eventValue': 1
        };
        // @ts-ignore
        ev.category = { 'primaryCategory': ctConstants.referral };
        // @ts-ignore
        digitalData.event.push(ev);
        // }
    }

    passwordReset(val: string) {
        //       this.adobeDtbTracking.anchorLink(`Routing to ${link || '/recipes/discover'} from ${comingFrom}`);


        if (!environment.production) return
        // @ts-ignore
        fbq('track', 'password reset on' + val);
        // @ts-ignore
        digitalData.component.push({
            'componentInfo': {
                'componentID': '',
                'componentName': ''
            },
            'attributes':
            {
                'position': '',
                'listPosition': '',
                'componentVariant': ''
            }
        });
        var ev = {};
        // @ts-ignore
        ev.eventInfo = {
            // @ts-ignore
            'type': ctConstants.trackEvent,
            // @ts-ignore
            'eventAction': ctConstants.PasswordReset,
            'eventLabel': ' Reset password on' + val,
            'eventValue': 1,
        };
        // @ts-ignore
        ev.category = { 'primaryCategory': ctConstants.engagement }
        // @ts-ignore
        ev.subcategory = 'Interest';
        // @ts-ignore
        digitalData.event.push(ev);
        // }
    }

    firstTimeUser(val) {
        //       this.adobeDtbTracking.anchorLink(`Routing to ${link || '/recipes/discover'} from ${comingFrom}`);


        if (!environment.production) return
        // @ts-ignore
        fbq('track', val);
        var ev = {};
        // @ts-ignore
        ev.eventInfo = {
            // @ts-ignore
            'type': ctConstants.trackEvent,
            // @ts-ignore
            'eventAction': ctConstants.registration,
            'eventLabel': val,
            'eventValue': 1
        };
        // @ts-ignore
        ev.category = { 'primaryCategory': ctConstants.other };
        // @ts-ignore
        digitalData.event.push(ev);
        // }
    }

    returningUser() {
        //       this.adobeDtbTracking.anchorLink(`Routing to ${link || '/recipes/discover'} from ${comingFrom}`);


        if (!environment.production) return
        // @ts-ignore
        fbq('track', 'Returning User sign in');
        var ev = {};
        // @ts-ignore
        ev.eventInfo = {
            // @ts-ignore
            'type': ctConstants.trackEvent,
            // @ts-ignore
            'eventAction': ctConstants.signIns,
            'eventLabel': 'Returning User',
            'eventValue': 1
        };
        // @ts-ignore
        ev.category = { 'primaryCategory': ctConstants.other }; ev.subcategory = 'Lead';
        // @ts-ignore
        digitalData.event.push(ev);
        // }
    }

    signout() {
        //       this.adobeDtbTracking.anchorLink(`Routing to ${link || '/recipes/discover'} from ${comingFrom}`);


        if (!environment.production) return
        // @ts-ignore
        fbq('track', 'Rerouting to Home Page on signout');
        var ev = {};
        // @ts-ignore
        ev.eventInfo = {
            // @ts-ignore
            'type': ctConstants.trackEvent,
            // @ts-ignore
            'eventAction': ctConstants.SignOut,
            'eventLabel': 'Rerouting to Home Page on signout',
            'eventValue': 1
        };
        // @ts-ignore
        ev.category = { 'primaryCategory': ctConstants.Custom };
        // @ts-ignore
        ev.subcategory = 'Interest';
        // @ts-ignore
        digitalData.event.push(ev);
        // }
    }

    anchorLink(val) {
        //       this.adobeDtbTracking.anchorLink(`Routing to ${link || '/recipes/discover'} from ${comingFrom}`);


        if (!environment.production) return
        // @ts-ignore
        fbq('track', val);
        var ev = {};
        // @ts-ignore
        ev.eventInfo = {
            // @ts-ignore
            'type': ctConstants.trackEvent,
            // @ts-ignore
            'eventAction': ctConstants.anchorLinkClicked,
            'eventLabel': val,
            'eventValue': 1
        };
        // @ts-ignore
        ev.category = { 'primaryCategory': ctConstants.custom };
        // @ts-ignore
        digitalData.event.push(ev);
        // }
    }



    updateInformation() {
        //       this.adobeDtbTracking.anchorLink(`Routing to ${link || '/recipes/discover'} from ${comingFrom}`);


        if (!environment.production) return
        // @ts-ignore
        fbq('track', 'Updating User Information on Profile');
        var ev = {};
        // @ts-ignore
        ev.eventInfo = {
            // @ts-ignore
            'type': ctConstants.trackEvent,
            // @ts-ignore
            'eventAction': ctConstants.profileEdit,
            'eventLabel': 'Updating User Information on Profile',
            'eventValue': 1
        };
        // @ts-ignore
        ev.category = { 'primaryCategory': ctConstants.custom }; ev.subcategory = 'Others';
        // @ts-ignore
        digitalData.event.push(ev);
        // }
    }
    checkbox(value: any) {
        //       this.adobeDtbTracking.anchorLink(`Routing to ${link || '/recipes/discover'} from ${comingFrom}`);


        if (!environment.production) return
        if (value.checked) {
            this.taggingOptin();
        } else {
            this.taggingOptout();
        }
        // }
    }
    taggingOptin() {
        //       this.adobeDtbTracking.anchorLink(`Routing to ${link || '/recipes/discover'} from ${comingFrom}`);


        if (!environment.production) return
        // @ts-ignore
        fbq('track', 'CompleteRegistration');
        var ev = {};
        // @ts-ignore
        ev.eventInfo = {
            // @ts-ignore
            'type': ctConstants.trackEvent,
            // @ts-ignore
            'eventAction': ctConstants.Acquisition,
            'eventLabel': 'BRAND OPTIN/CORPORATE OPTIN',
            'eventValue': 1
        };
        // @ts-ignore
        ev.category = { 'primaryCategory': ctConstants.conversion }; ev.subcategory = 'Lead';
        // @ts-ignore
        digitalData.event.push(ev);
        // }
    }

    taggingOptout() {
        //       this.adobeDtbTracking.anchorLink(`Routing to ${link || '/recipes/discover'} from ${comingFrom}`);


        if (!environment.production) return
        // @ts-ignore
        fbq('track', 'BRAND OPTOUT/CORPORATE OPTOUT');
        var ev = {};
        // @ts-ignore
        ev.eventInfo = {
            // @ts-ignore
            'type': ctConstants.trackEvent,
            // @ts-ignore
            'eventAction': ctConstants.Acquisitionout,
            'eventLabel': 'BRAND OPTOUT/CORPORATE OPTOUT',
            'eventValue': 1
        };
        // @ts-ignore
        ev.category = { 'primaryCategory': ctConstants.custom };
        // @ts-ignore
        digitalData.event.push(ev);
        // }
    }

    contactUs(val) {
        //       this.adobeDtbTracking.anchorLink(`Routing to ${link || '/recipes/discover'} from ${comingFrom}`);


        if (!environment.production) return
        // @ts-ignore
        fbq('track', 'CONTACT US Using:' + val);
        var ev = {};
        // @ts-ignore
        ev.eventInfo = {
            // @ts-ignore
            'type': ctConstants.trackEvent,
            // @ts-ignore
            'eventAction': ctConstants.contactus,
            'eventLabel': 'CONTACT US Using:' + val,
            'eventValue': 1
        };
        // @ts-ignore
        ev.category = { 'primaryCategory': ctConstants.other };
        // @ts-ignore
        digitalData.event.push(ev);
        // }
    }

    sharingMealByEmail(title) {
        //       this.adobeDtbTracking.anchorLink(`Routing to ${link || '/recipes/discover'} from ${comingFrom}`);


        if (!environment.production) return
        // @ts-ignore
        fbq('track', 'Sharing ' + title + ' by Email');
        var ev = {};
        // @ts-ignore
        ev.eventInfo = {
            // @ts-ignore
            'type': ctConstants.trackEvent,
            // @ts-ignore
            'eventAction': ctConstants.share,
            'eventLabel': 'Sharing ' + title + ' by Email',
            'eventValue': 1
        };
        // @ts-ignore
        ev.category = { 'primaryCategory': ctConstants.referral }; ev.subcategory = 'Lead';
        // @ts-ignore
        digitalData.event.push(ev);
        // }
    }

    anchorLinkMeal(val, title) {
        //       this.adobeDtbTracking.anchorLink(`Routing to ${link || '/recipes/discover'} from ${comingFrom}`);


        if (!environment.production) return
        // @ts-ignore
        fbq('track', val + title);
        var ev = {};
        // @ts-ignore
        ev.eventInfo = {
            // @ts-ignore
            'type': ctConstants.trackEvent,
            // @ts-ignore
            'eventAction': ctConstants.anchorLinkClicked,
            'eventLabel': val + title,
            'eventValue': 1
        };
        // @ts-ignore
        ev.category = { 'primaryCategory': ctConstants.custom };
        // @ts-ignores
        digitalData.event.push(ev);
        // }
    }

    anchorLinkTab(val, file, title) {
        //       this.adobeDtbTracking.anchorLink(`Routing to ${link || '/recipes/discover'} from ${comingFrom}`);


        if (!environment.production) return
        if (file == "profile page") {
            if (!isNaN(val)) {
                if (val == 0) {
                    val = "PERSONAL INFO TAB on profile page";
                } else if (val == 1) {
                    val = "SECURITY TAB on profile page";
                } else if (val == 2) {
                    val = "NOTIFICATIONS TAB on profile page";
                }
            }
        } else if (file == "meal detail") {
            if (!isNaN(val)) {
                if (val == 0) {
                    val = "INGREDIENTS TAB for: " + title;
                } else if (val == 1) {
                    val = "INSTRUCTIONS TAB for: " + title;
                } else if (val == 2) {
                    val = "NUTRITION TAB for: " + title;
                }
            }

        }
        // @ts-ignore
        fbq('track', val);
        var ev = {};
        // @ts-ignore
        ev.eventInfo = {
            // @ts-ignore
            'type': ctConstants.trackEvent,
            // @ts-ignore
            'eventAction': ctConstants.anchorLinkClicked,
            'eventLabel': val,
            'eventValue': 1
        };
        // @ts-ignore
        ev.category = { 'primaryCategory': ctConstants.custom };
        // @ts-ignores
        digitalData.event.push(ev);
        //   }
    }

    searchQuery(query, size) {
        //       this.adobeDtbTracking.anchorLink(`Routing to ${link || '/recipes/discover'} from ${comingFrom}`);


        if (!environment.production) return
        // @ts-ignore
        fbq('track', query);
        var ev = {};
        // @ts-ignore
        ev.eventInfo = {
            // @ts-ignore
            'type': ctConstants.trackEvent,
            // @ts-ignore
            'eventAction': ctConstants.siteSearch,
            'eventLabel': query + ' - ' + size,
            'eventValue': 1
        };
        // @ts-ignore
        ev.category = { 'primaryCategory': ctConstants.other }; ev.subcategory = 'Interest';
        // @ts-ignore
        digitalData.page.attributes.contentType = "SEARCH TYPE"
        // @ts-ignore
        digitalData.event.push(ev);
        // }
    }
}