export const Filters: IFilter[] = [
    {
        name: '30 minutes or less',
        id: 1588,
        key: 'p_cook_time',
        value: '0,30'
    },
    {
        name: 'Chicken',
        query: '',
        id: 1503,
        key: 'q',
        value: 'chicken'

    },
    {
        name: 'Summer',
        query: '',
        id: 1544,
        key: 'q',
        value: 'summer'

    },
    {
        name: 'BBQ',
        query: '',
        key: 'q',
        value: 'BBQ',
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
        query: '',
        key: 'q',
        value: 'main dish',
        id: 1400,
        // id:6536

    },
    {
        name: 'Pasta',
        query: '',
        key: 'q',
        value: 'pasta recipes',
        id: 1047,
    },
    {
        name: 'Beef',
        query: '',
        id: 1499,
        key: 'q',
        value: 'beef',

    },
    // bbq, slowcooker, pasta, dinner
    {
        name: 'Slow-Cooker',
        query: '',
        key: 'q',
        value: 'slow-cooked recipes',
        id: 1390,

    },
    {
        name: 'Breakfast & Brunch',
        query: '',
        key: 'q',
        value: 'breakfast,brunch',
        id: '1551,619'

    },
    {
        name: 'Italian',
        query: '',
        key: 'q',
        value: 'italian',
        id: 1422,

    },
    {
        name: 'Indian',
        query: '',
        key: 'q',
        value: 'indian',
        id: 1419,

    },
    {
        name: 'Asian',
        key: 'q',
        value: 'asian',
        query: '',
        id: 1433,

    },
    {
        name: 'Mexican',
        query: '',
        id: 1427,
        key: 'q',
        value: 'mexican',

    },
    {
        name: 'Middle Eastern',
        query: '',
        id: 1428,
        key: 'q',
        value: 'middle eastern', // typo on backend this compensates for it

    },
    {
        name: 'Mediterranean',
        query: '',
        id: 1435,
        key: 'q',
        value: 'Mediterranean',

    },
    {
        name: 'Canadian',
        query: '',
        id: 1295,
        key: 'q',
        value: 'canadian',


    },
    {
        name: 'Salad',
        query: '',
        id: 1487,
        key: 'q',
        value: 'salad',

    },
    {
        name: 'Better-For-You',
        query: '',
        disclaimerId: '*',
        id: 9870,
        key: 'p_tag_ids',
        value: 'Better for you',

    },
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
    query?: string;
    disclaimerId?: string;
    active?: boolean;
    id: any;
    [key: string]: string | number | boolean;
}