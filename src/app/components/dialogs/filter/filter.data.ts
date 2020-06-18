export const Filters: IFilter[] = [
    {
        name: 'Quick & Easy',
        id: 1,
        key: 'p_cook_time',
        value: '0,30'
    },
    {
        name: 'Chicken',
        query: '',
        id: 2,
        key: 'p_title',
        value: 'chicken'

    },
    {
        name: 'Summer',
        query: '',
        id: 3,
        key: 'q',
        value: 'summer'

    },
    {
        name: 'BBQ',
        query: '',
        key: 'q',
        value: 'BBQ',
        id: 4,

    },
    {
        name: 'Vegetarian',
        query: '',
        'p_vegetarian': true,
        key: 'p_vegetarian',
        value: true,
        disclaimerId: '*',
        id: 5,

    },
    {
        name: 'Dinner',
        query: '',
        key: 'q',
        value: 'main course',
        id: 6,

    },
    {
        name: 'Pasta',
        query: '',
        key: 'q',
        value: 'pasta recipes',
        id: 7,
    },
    {
        name: 'Beef',
        query: '',
        id: 8,
        key: 'q',
        value: 'beef',

    },
    {
        name: 'Slow-Cooker',
        query: '',
        key: 'q',
        value: 'slow-cooked recipes',
        id: 9,

    },
    {
        name: 'Breakfast & Brunch',
        query: '',
        key: 'q',
        value: 'breakfast,brunch',
        id: 10,

    },
    {
        name: 'Italian',
        query: '',
        key: 'q',
        value: 'italian',
        id: 11,

    },
    {
        name: 'Indian',
        query: '',
        key: 'q',
        value: 'indian',
        id: 12,

    },
    {
        name: 'Asian',
        key: 'q',
        value: 'asian',
        query: '',
        id: 13,

    },
    {
        name: 'Mexican',
        query: '',
        id: 14,
        key: 'q',
        value: 'mexican',

    },
    {
        name: 'Middle Eastern',
        query: '',
        id: 15,
        key: 'q',
        value: 'middle eastern', // typo on backend this compensates for it

    },
    {
        name: 'Mediterranean',
        query: '',
        id: 16,
        key: 'q',
        value: 'Mediterranean',

    },
    {
        name: 'Canadian',
        query: '',
        id: 17,
        key: 'q',
        value: 'canadian',


    },
    {
        name: 'Salad',
        query: '',
        id: 18,
        key: 'q',
        value: 'salad',

    },
    {
        name: 'Better-For-You',
        query: '',
        disclaimerId: '**',
        id: 19,
        key: 'p_kcal_per_serving',
        value: '0,500',

    },
]

export const Disclaimers = [{
    disclaimerId: '*',
    title: 'Vegetarian',
    text: 'Our (ovo-lacto) vegetarian recipes may contain dairy products and eggs, but no other animal products.',
    italic: 'The Hellmann’s/Knorr product in these recipes is vegetarian. Always check the label of all other ingredients you use to ensure they are free of animal products',

},
{
    disclaimerId: '**',
    title: 'Better-For-You',
    text: 'Our Better-For-You recipes strive to promote a balanced and healthy eating pattern that is aligned with Authoritative Guidance, encouraging the intake of vegetables, whole grains, fruit, legumes and good fats, while limiting saturated fat, sodium and sugars.'

},
]

export interface IFilter {
    name: string;
    query?: string;
    disclaimerId?: string;
    active?: boolean;
    id: number;
    [key: string]: string | number | boolean;
}