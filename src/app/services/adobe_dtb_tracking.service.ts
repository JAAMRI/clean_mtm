import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})

export class AdobeDtbTracking {
    apiHost = environment.host;
    pageLoad(name) {
         if (environment.production) {
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
        } 
    }

    pageTracking(name: string, url: string) {
         if (environment.production) {
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
               }
    }

    socialMediaTracking(name, url) {
         if (environment.production) {
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
               }
    }

    passwordReset(val: string) {
         if (environment.production) {
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
               }
    }

    firstTimeUser(val) {
         if (environment.production) {
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
               }
    }

    returningUser() {
         if (environment.production) {
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
               }
    }

    signout() {
         if (environment.production) {
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
               }
    }

    anchorLink(val) {
         if (environment.production) {
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
               }
    }



    updateInformation() {
         if (environment.production) {
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
               }
    }
    checkbox(value: any) {
         if (environment.production) {
        if (value.checked) {
            this.tagging_optin();
        } else {
            this.tagging_optout();
        }
               }
    }
    taggingOptin() {
         if (environment.production) {
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
               }
    }

    taggingOptout() {
         if (environment.production) {
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
               }
    }

    contactUs(val) {
         if (environment.production) {
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
               }
    }

    sharingMealByEmail(title) {
         if (environment.production) {
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
               }
    }

    searchQuery(query, size) {
         if (environment.production) {
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
               }
    }
}