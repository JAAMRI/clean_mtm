import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})

export class AdobeDtbTracking {
    apiHost = environment.host;
    page_load(name) {
        if(environment.production){
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
        }else{
            return;
        }
    }

    page_tracking(name, url) {
        if(environment.production){
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
        }else{
            return;
        }
    }

    social_media_tracking(name, url) {
        if(environment.production){
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
        }else{
            return;
        }
    }

    password_reset(val: string) {
        if(environment.production){
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
        }else{
            return;
        }
    }

    first_time_user(val) {
        if(environment.production){    
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
        }else{
            return;
        }
    }

    returning_user() {
        if(environment.production){    
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
        }else{
            return;
        }
    }

    signout() {
        if(environment.production){
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
        }else{
            return;
        }
    }

    anchor_link(val) {
        if(environment.production){
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
        }else{
            return;
        }
    }

    anchor_link_tab(val, from_file, meal_title) {
        if(environment.production){
            if (from_file == "profile page") {
                if (!isNaN(val)) {
                    if (val == 0) {
                        val = "PERSONAL INFO TAB on profile page";
                    } else if (val == 1) {
                        val = "SECURITY TAB on profile page";
                    } else if (val == 2) {
                        val = "NOTIFICATIONS TAB on profile page";
                    }
                }
            } else if (from_file == "meal detail") {
                if (!isNaN(val)) {
                    if (val == 0) {
                        val = "INGREDIENTS TAB for: " + meal_title;
                    } else if (val == 1) {
                        val = "INSTRUCTIONS TAB for: " + meal_title;
                    } else if (val == 2) {
                        val = "NUTRITION TAB for: " + meal_title;
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
        }else{
            return;
        }
    }

    anchor_link_meal(val, meal_title) {
        if(environment.production){
            // @ts-ignore
            fbq('track', val + meal_title);
            var ev = {};
            // @ts-ignore
            ev.eventInfo = {
                // @ts-ignore
                'type': ctConstants.trackEvent,
                // @ts-ignore
                'eventAction': ctConstants.anchorLinkClicked,
                'eventLabel': val + meal_title,
                'eventValue': 1
            };
            // @ts-ignore
            ev.category = { 'primaryCategory': ctConstants.custom };
            // @ts-ignores
            digitalData.event.push(ev);
        }else{
            return;
        }
    }
    update_information() {
        if(environment.production){
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
        }else{
            return;
        }
    }
    checkbox(value) {
        if(environment.production){    
            if (value.checked) {
                this.tagging_optin();
            } else {
                this.tagging_optout();
            }
        }else{
            return;
        }
    }
    tagging_optin() {
        if(environment.production){
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
        }else{
            return;
        }
    }

    tagging_optout() {
        if(environment.production){
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
        }else{
            return;
        }
    }

    contact_us(val) {
        if(environment.production){
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
        }else{
            return;
        }
    }

    sharing_meal_by_email(title) {
        if(environment.production){
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
        }else{
            return;
        }
    }

    search_query(query, size) {
        if(environment.production){
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
        }else{
            return;
        }
    }
}