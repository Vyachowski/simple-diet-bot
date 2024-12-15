export enum Meal {
  Breakfast = 'Breakfast',
  Brunch = 'Brunch',
  Lunch = 'Lunch',
  Snack = 'Snack',
  Dinner = 'Dinner',
}

export interface Recipe {
  name: string;
  ingredients: { name: string; amountInGramms: number }[];
  calories: number;
  meal: Meal;
  instruction: string;
  image?: string;
}
