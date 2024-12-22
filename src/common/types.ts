export enum Meal {
  Breakfast = 'breakfast',
  Brunch = 'brunch',
  Lunch = 'lunch',
  Snack = 'snack',
  Dinner = 'dinner',
}

export interface Recipe {
  name: string;
  ingredients: { name: string; amountInGramms: number }[];
  calories: number;
  meal: Meal;
  instruction: string;
  image?: string;
}
