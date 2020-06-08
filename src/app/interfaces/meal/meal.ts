export interface Meal {
    id: string;
    image: string;
    cuisine?:string;
    title: string;
    nutrition: any;
    cookTime: number;
    prepTime: number
    servings: number;
    ingredients: any[];
    instructions: any[];
    description: string;
    mainIngredient: string;
    relatedRecipes?: RelatedRecipe[];
}

export interface Meals {
    didYouMean?: string;
    results: number;
    items: Meal[];
}

export interface RelatedRecipe {
    title: string;
        id: string;
        image: string;
}