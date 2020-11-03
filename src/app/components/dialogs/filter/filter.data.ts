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
    'mexican': '1427',
    'middle_eastern': '1428',
    'mediterranean': '1435',
    'canadian': '1295',
    'salad': '1487',
    'better_for_you': '9870',
    'dinner': '1400',
}


export const Filters: IFilter[] = [
    {
        name: $localize`30 minutes or less`,
        key: '30_minutes_or_less',
        id: 1588,
       
    },
    {
        name: $localize`chicken`,
        key: 'chicken',

        id: 1503,
     

    },
    {
        name: $localize`summer`,
        key: 'summer',

        id: 1544,
      

    },
    {
        name: $localize`bbq`,
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
        name: $localize`dinner`,
        key: 'dinner',

        id: 1400,
        // id:6536

    },
    {
        name: $localize`pasta`,
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
        name: $localize`tea`,
        key: 'tea',

        id: 1368,

    },
    {
        name: $localize`breakfast and brunch`,
        key: 'breakfast_and_brunch',

        id: '1551,619'

    },
    {
        name: $localize`italian`,
        key: 'italian',

        id: 1422,

    },
    {
        name: $localize`indian`,
        key: 'indian',

        id: 1419,

    },
    {
        name: $localize`asian`,
        key: 'asian',

        id: 1433,

    },
    {
        name: $localize`mexican`,
        id: 1427,
        key: 'mexican',


    },
    {
        name: $localize`middle eastern`,
        id: 1428,
        key: 'middle_eastern',

    },
    {
        name: $localize`mediterranean`,
        id: 1435,
        key: 'mediterranean',


    },
    {
        name: $localize`canadian`,
        id: 1295,
        key: 'canadian',


    },
    {
        name: $localize`salad`,
        id: 1487,
        key: 'salad',


    },
    {
        name: $localize`better for you`,
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
    text: $localize`Our Better-For-You recipes strive to promote a balanced and healthy eating pattern that is aligned with Authoritative Guidance, encouraging the intake of vegetables, whole grains, fruit, legumes and good fats, while limiting saturated fat, sodium and sugars.`

},
]

export interface IFilter {
    name: string;
    disclaimerId?: string;
    active?: boolean;
    id?: any;
    [key: string]: string | number | boolean;
}