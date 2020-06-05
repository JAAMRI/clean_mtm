export const Filters: IFilter[] = [
    {
        name: 'Quick & Easy',
        query: '',
        id: 1,
    },
    {
        name: 'Chicken',
        query: '',
        id: 2,

    },
    {
        name: 'Summer',
        query: '',
        id: 3,

    },
    {
        name: 'BBQ',
        query: '',
        id: 4,

    },
    {
        name: 'Vegetarian',
        query: '',
        disclosure: 1,
        id: 5,

    },
    {
        name: 'Dinner',
        query: '',
        id: 6,

    },
    {
        name: 'Pasta',
        query: '',
        id: 7,
    },
    {
        name: 'Beef',
        query: '',
        id: 7,

    },
    {
        name: 'Slow-Cooker',
        query: '',
        id: 8,

    },
    {
        name: 'Breakfast & Brunch',
        query: '',
        id: 9,

    },
    {
        name: 'Italian',
        query: '',
        id: 10,

    },
    {
        name: 'Indian',
        query: '',
        id: 11,

    },
    {
        name: 'Asian',
        query: '',
        id: 12,

    },
    {
        name: 'Mexican',
        query: '',
        id: 13,

    },
    {
        name: 'Middle Eastern',
        query: '',
        id: 14,

    },
    {
        name: 'Mediterranean',
        query: '',
        id: 15,

    },
    {
        name: 'Canadian',
        query: '',
        id: 16,

    },
    {
        name: 'Salad',
        query: '',
        id: 17,

    },
    {
        name: 'Better for you ',
        query: '',
        disclosure: 2,
        id: 18,

    },
]

export const Disclosures = [
    'Our (ovo-lacto) vegetarian recipes may contain dairy products and eggs, but no other animal products.*The Hellmann’s/Knorr product in these recipes are vegetarian. Always check the label of all other ingredients you use to ensure they are free of animal products. ',
    'Our Better-for-You recipes strive to promote a balanced and healthy eating pattern that is aligned with Authoritative Guidance, encouraging the intake of vegetables, whole grains, fruit, legumes and good fats, while limiting saturated fat, sodium and sugars. '
]

export interface IFilter {
    name: string;
    query: string;
    disclosure?: number;
    active?: boolean;
    id: number;
}