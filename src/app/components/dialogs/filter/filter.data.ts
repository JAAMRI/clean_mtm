export const FilterIdsByName = {
    '30_minutes_or_less': '1588',
    'chicken': '1503',
    'summer': '1544',
    'bbq': '1393',
    'pasta': '1047',
    'beef': '1499',
    'slow_cooker': '1390',
    'tea': '1368',
    'breakfast_and_brunch': '1551,619',
    'italian': '1422',
    'indian': '1419',
    'asian': '1433',
    'mexican': '1433',
    'middle_eastern': '1428',
    'mediterranean': '1435',
    'canadian': '1295',
    'salad': '1487',
    'better_for_you': '9870',
    'dinner': '1400',
}


export const Filters: IFilter[] = [
    {
        name: '30 minutes or less',
        key: '30_minutes_or_less',
        id: 1588,
       
    },
    {
        name: 'Chicken',
        key: 'chicken',

        id: 1503,
     

    },
    {
        name: 'Summer',
        key: 'summer',

        id: 1544,
      

    },
    {
        name: 'BBQ',
        key: 'bbq',

        id: 1393,

    },
    // {
    //     name: 'Vegetarian',
    //     query: '',
    //     'p_vegetarian': true,
    //     key: 'p_vegetarian',
    //     value: true,
    //     disclaimerId: '*',
    //     id: 9733,

    // },
    {
        name: 'Dinner',
        key: 'dinner',

        id: 1400,
        // id:6536

    },
    {
        name: 'Pasta',
        key: 'pasta',

        id: 1047,
    },
    {
        name: 'Beef',
        id: 1499,
        key: 'beef',


    },
    // bbq, slowcooker, pasta, dinner
    {
        name: 'Slow-Cooker',
        key: 'slow_cooker',

        id: 1390,

    },
    {
        name: 'Tea',
        key: 'tea',

        id: 1368,

    },
    {
        name: 'Breakfast & Brunch',
        key: 'breakfast_and_brunch',

        id: '1551,619'

    },
    {
        name: 'Italian',
        key: 'italian',

        id: 1422,

    },
    {
        name: 'Indian',
        key: 'indian',

        id: 1419,

    },
    {
        name: 'Asian',
        key: 'asian',

        id: 1433,

    },
    {
        name: 'Mexican',
        id: 1427,
        key: 'mexican',


    },
    {
        name: 'Middle Eastern',
        id: 1428,
        key: 'middle_eastern',

    },
    {
        name: 'Mediterranean',
        id: 1435,
        key: 'mediterranean',


    },
    {
        name: 'Canadian',
        id: 1295,
        key: 'canadian',


    },
    {
        name: 'Salad',
        id: 1487,
        key: 'salad',


    },
    {
        name: 'Better-For-You',
        disclaimerId: '*',
        id: 9870,
        key: 'better_for_you',
    }
]

export const Disclaimers = [
//     {
//     disclaimerId: '*',
//     title: 'Vegetarian',
//     text: 'Our (ovo-lacto) vegetarian recipes may contain dairy products and eggs, but no other animal products.',
//     italic: 'The Hellmann’s/Knorr product in these recipes are vegetarian. Always check the label of all other ingredients you use to ensure they are free of animal products',

// },
{
    disclaimerId: '*',
    title: 'Better-For-You',
    text: 'Our Better-For-You recipes strive to promote a balanced and healthy eating pattern that is aligned with Authoritative Guidance, encouraging the intake of vegetables, whole grains, fruit, legumes and good fats, while limiting saturated fat, sodium and sugars.'

},
]

export interface IFilter {
    name: string;
    disclaimerId?: string;
    active?: boolean;
    id?: any;
    [key: string]: string | number | boolean;
}