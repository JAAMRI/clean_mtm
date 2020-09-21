export const AuthenticatedPages = [
    {
        name: 'SELECT RECIPES',
        route: '/recipes/discover',
        toggled: false,
        subPages: [
            {
                name: '30 minutes or less',
                route: '/recipes/discover/30_minutes_or_less',
            },
            {
                name: 'Chicken',
                route: '/recipes/discover/chicken',
            },
            {
                name: 'Summer',
                route: '/recipes/discover/summer',
            },
            {
                name: 'BBQ',
                route: '/recipes/discover/bbq',
            },
            {
                name: 'Dinner',
                route: '/recipes/discover/dinner',
            },
            {
                name: 'pasta',
                route: '/recipes/discover/pasta',
            },
            {
                name: 'Slow Cooker',
                route: '/recipes/discover/slow_cooker',
            },
            {
                name: 'Tea',
                route: '/recipes/discover/tea',
            },
            {
                name: 'Breakfast and Brunch',
                route: '/recipes/discover/breakfast_and_brunch',
            },
            {
                name: 'Slow Cooker',
                route: '/recipes/discover/slow_cooker',
            },
            {
                name: 'Italian',
                route: '/recipes/discover/italian',
            },
            {
                name: 'Indian',
                route: '/recipes/discover/indian',
            },
            {
                name: 'Asian',
                route: '/recipes/discover/asian',
            },
            {
                name: 'Mexican',
                route: '/recipes/discover/mexican',
            },
            {
                name: 'Middle Eastern',
                route: '/recipes/discover/middle_eastern',
            },
            {
                name: 'Mediterranean',
                route: '/recipes/discover/mediterranean',
            },
            {
                name: 'Canadian',
                route: '/recipes/discover/canadian',
            },
            {
                name: 'Salad',
                route: '/recipes/discover/salad',
            },
            {
                name: 'Better for you',
                route: '/recipes/discover/better_for_you',
            },
        ]
    },
    { name: `MEAL PLAN`, route: '/recipes/my-meals' },
    { name: 'GROCERY LIST', route: '/recipes/grocery-list' },
    { name: `FAVOURITES`, route: '/recipes/favourites', }, // TODO when favourites page is created
];

export const MenuPages = [
    { name: 'ARTICLES', route: '/article', },
    { name: `ABOUT`, route: '/about', }, // TODO when favourites page is created
    { name: `CONTACT US`, route: '/contact-us' },
    { name: 'FAQ', route: '/faqs' },
];