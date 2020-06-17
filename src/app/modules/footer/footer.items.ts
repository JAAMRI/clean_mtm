
export const SocialFooterItems = [
    {
        name: 'Facebook',
        href: 'https://www.facebook.com/MealsThatMatterCanada/',
        img: '/assets/static_images/footer/fb-logo.svg'
    },
    {
        name: 'Instagram',
        href: 'https://www.instagram.com/mealsthatmatter/',
        img: '/assets/static_images/footer/instagram.png'
    },
    {
        name: 'Pinterest',
        href: 'https://www.pinterest.ca/MealsThatMatterCA/',
        img: '/assets/static_images/footer/pinterest.svg'
    },
    {
        name: 'Amazon Alexa',
        href: 'https://www.amazon.ca/Unilever-Canada-Meals-that-MatterTM/dp/B07L2B32LQ/ref=pd_lutyp_crtyp_simh_1_1/147-4269172-2761155?_encoding=UTF8&pd_rd_i=B07L2B32LQ&pd_rd_r=a1999550-45b9-4e0a-a10f-8c3a8645e9c9&pd_rd_w=qkIEK&pd_rd_wg=IQyFU&pf_rd_p=d219e352-c0b8-4f3c-978b-56743d208e51&pf_rd_r=JXTW3Y2XS877YPZQ09YF&psc=1&refRID=JXTW3Y2XS877YPZQ09YF',
        img: '/assets/icons/MTM-favicon-72x72.png'
    },

];

export const AdFooterItems: IFooterItems[] = [{
    name: 'Unilever',
    href: 'https://www.unilever.ca',
    img: '/assets/static_images/footer/unilever-logo.svg'
}];

export const LegalFooterItems: IFooterItems[] = [{
    name: 'Terms of use',
    href: 'https://www.unilever.ca/legal.html',

}, {
    name: 'Privacy Policy',
    href: 'https://www.unilevernotices.com/canada/english/privacy-notice/notice.html'
},
{
    name: 'FAQs',
    routerLink: '/faqs'
},

]

export const BrandsFooterItems: IFooterItems[] = [{
    name: 'Visit Knorr',
    href: 'https://www.knorr.com/ca/en/home.html'
},
{
    name: "Visit Hellmann's",
    href: 'https://www.hellmanns.com/ca/en/home.html'
},

]


export const FooterItems: { [type: string]: IFooterItems[] } = {
    social: SocialFooterItems,
    ad: AdFooterItems,
    legal: LegalFooterItems,
    brands: BrandsFooterItems

}


export interface IFooterItems {
    name: string;
    href?: string;
    routerLink?: string;
    img?: string;
}