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
        disclosure: 1,
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
        value: 'pasta',
        id: 7,
    },
    {
        name: 'Beef',
        query: '',
        id: 7,
        key: 'q',
        value: 'beef',

    },
    {
        name: 'Slow-Cooker',
        query: '',
        key: 'q',
        value: 'simmer',
        id: 8,

    },
    {
        name: 'Breakfast & Brunch',
        query: '',
        key: 'q',
        value: 'breakfast,brunch',
        id: 9,

    },
    {
        name: 'Italian',
        query: '',
        key: 'q',
        value: 'italian',
        id: 10,

    },
    {
        name: 'Indian',
        query: '',
        key: 'q',
        value: 'indian',
        id: 11,

    },
    {
        name: 'Asian',
        key: 'q',
        value: 'asian',
        query: '',
        id: 12,

    },
    {
        name: 'Mexican',
        query: '',
        id: 13,
        key: 'q',
        value: 'mexican',

    },
    {
        name: 'Middle Eastern',
        query: '',
        id: 14,
        key: 'q',
        value: 'middle eastern',

    },
    {
        name: 'Mediterranean',
        query: '',
        id: 15,
        key: 'q',
        value: 'Mediterranean',

    },
    {
        name: 'Canadian',
        query: '',
        id: 16,
        key: 'q',
        value: 'canadian',
        

    },
    {
        name: 'Salad',
        query: '',
        id: 17,
        key: 'q',
        value: 'salad',

    },
    {
        name: 'Better for you',
        query: '',
        disclosure: 2,
        id: 18,
        key: 'p_kcal_per_serving',
        value: '0,500',

    },
]

export const Disclosures = [
    'Our (ovo-lacto) vegetarian recipes may contain dairy products and eggs, but no other animal products.*The Hellmann’s/Knorr product in these recipes are vegetarian. Always check the label of all other ingredients you use to ensure they are free of animal products. ',
    'Our Better-for-You recipes strive to promote a balanced and healthy eating pattern that is aligned with Authoritative Guidance, encouraging the intake of vegetables, whole grains, fruit, legumes and good fats, while limiting saturated fat, sodium and sugars. '
]

export interface IFilter {
    name: string;
    query?: string;
    disclosure?: number;
    active?: boolean;
    id: number;
    [key: string]: string | number | boolean;
}