export const MenuPages = [
    {
        name: $localize `select recipes`,
        route: '/recipes/discover',
        toggled: false,
        subPages: [
            {
                name: $localize `all recipes`,
                route: '/recipes/discover',
            },
            {
                name: $localize `30 minutes or less`,
                route: '/recipes/discover/30_minutes_or_less',
            },
            {
                name:  $localize `chicken`,
                route: '/recipes/discover/chicken',
            },
            {
                name: $localize `summer`,
                route: '/recipes/discover/summer',
            },
            {
                name: $localize `bbq`,
                route: '/recipes/discover/bbq',
            },
            {
                name: $localize `dinner`,
                route: '/recipes/discover/dinner',
            },
            {
                name: $localize `pasta`,
                route: '/recipes/discover/pasta',
            },
            {
                name: $localize `slow cooker`,
                route: '/recipes/discover/slow_cooker',
            },
            {
                name: $localize `tea`,
                route: '/recipes/discover/tea',
            },
            {
                name: $localize `breakfast and brunch`,
                route: '/recipes/discover/breakfast_and_brunch',
            },
            {
                name: $localize `italian`,
                route: '/recipes/discover/italian',
            },
            {
                name: $localize `indian`,
                route: '/recipes/discover/indian',
            },
            {
                name: $localize `asian`,
                route: '/recipes/discover/asian',
            },
            {
                name: $localize `mexican`,
                route: '/recipes/discover/mexican',
            },
            {
                name: $localize `middle eastern`,
                route: '/recipes/discover/middle_eastern',
            },
            {
                name: $localize `mediterranean`,
                route: '/recipes/discover/mediterranean',
            },
            {
                name: $localize `canadian`,
                route: '/recipes/discover/canadian',
            },
            {
                name: $localize `salad`,
                route: '/recipes/discover/salad',
            },
            {
                name: $localize `better for you`,
                route: '/recipes/discover/better_for_you',
            },
        ]
    },
    { name: $localize `meal plan`, route: '/recipes/my-meals' },
    { name: $localize `grocery list`, route: '/recipes/grocery-list' },
    { name: $localize `favourites`, route: '/recipes/favourites', }, // TODO when favourites page is created
    { name: $localize `articles`, route: '/articles', },
    { name: $localize `about`, route: '/about', }, // TODO when favourites page is created
    { name: $localize `contact us`, route: '/contact-us' },
    { name: $localize `faq`, route: '/faqs' },
];