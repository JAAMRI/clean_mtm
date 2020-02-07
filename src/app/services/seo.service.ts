import { Injectable, RendererFactory2, ViewEncapsulation, Inject } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';
@Injectable()
export class SeoService {
    renderer: any;
    constructor(private meta: Meta, private rendererFactory: RendererFactory2,
        @Inject(DOCUMENT) private document) {
        this.renderer = this.rendererFactory.createRenderer(this.document, {
            id: '-1',
            encapsulation: ViewEncapsulation.None,
            styles: [],
            data: {}
        });
    }

    generateTags(config) {
        // default values
        config = {
            title: 'Meals That Matter - Plan. Prep. Plate.',
            description: 'Your Personalized Meal Planner - Meals That Matter.',
            image: 'https://mealsthatmatter-asset.s3.amazonaws.com/mealsthatmatter.com.assets/icons/icon-384x384.png',
            slug: '',
            ...config
        }
        this.meta.updateTag({ name: 'description', content: config.description });
        this.meta.updateTag({ name: 'twitter:card', content: 'summary' });
        this.meta.updateTag({ name: 'twitter:site', content: '@content' });
        this.meta.updateTag({ name: 'twitter:title', content: config.title });
        this.meta.updateTag({ name: 'twitter:description', content: config.description });
        this.meta.updateTag({ name: 'twitter:image', content: config.image });
        this.meta.updateTag({ property: 'og:type', content: 'article' });
        this.meta.updateTag({ property: 'og:site_name', content: 'content' });
        this.meta.updateTag({ property: 'og:title', content: config.title });
        this.meta.updateTag({ property: 'og:description', content: config.description });
        this.meta.updateTag({ property: 'og:image', content: config.image });
        this.meta.updateTag({ property: 'og:url', content: `https://www.mealsthatmatter.com/${config.slug}` });
    }


    updateTag(tag: LinkDefinition) {
        this.removeTag();
        this.addTag(tag);
    }

    addTag(tag: LinkDefinition) {

        try {

            const link = this.renderer.createElement('link');
            const head = this.document.head;


            if (head === null) {
                throw new Error('<head> not found within DOCUMENT.');
            }


            Object.keys(tag).forEach((prop: string) => {
                return this.renderer.setAttribute(link, prop, tag[prop]);
            });

            // [TODO]: get them to update the existing one (if it exists) ?
            this.renderer.appendChild(head, link);

        } catch (e) {
            console.error('Error within seo service : ', e);
        }
    }


    removeTag() {
        try {
            if (this.document.querySelector("link[rel='canonical']") == null) {
                return;
            } else {
                // const selector = this._parseSelector(tag);
                const comp = this.document.querySelector("link[rel='canonical']");
                const head = this.document.head;
                if (head === null) {
                    throw new Error('<head> not found within DOCUMENT.');
                }
                this.renderer.removeChild(head, comp);
                // const canonical = this.document.querySelector(selector)

                // if (!!canonical) {
                // this.renderer.removeChild(head, 'rel="canonical"');
                // }
            }

        } catch (e) {
            console.error('Error within linkService : ', e);
        }
    }

    // private _parseSelector(tag: LinkDefinition): string {
    //     // Possibly re-work this
    //     const attr: string = tag.rel ? 'rel' : 'hreflang';
    //     return `${attr}="${tag[attr]}"`;
    // }

}
export declare type LinkDefinition = {
    charset?: string;
    crossorigin?: string;
    href?: string;
    hreflang?: string;
    media?: string;
    rel?: string;
    rev?: string;
    sizes?: string;
    target?: string;
    type?: string;
} & {
    [prop: string]: string;
}
