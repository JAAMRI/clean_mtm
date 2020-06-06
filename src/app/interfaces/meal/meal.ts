export interface Meal {
    id: string;
    image: string;
    cuisine?:string;
    title: string;
    nutrition: any;
    cookTime: string;
    prepTime: string
    servings: number;
    ingredients: any[];
    instructions: any[];
    mainIngredient: string;
}

export interface Meals {
    didYouMean?: string;
    results: number;
    items: Meal[];
}