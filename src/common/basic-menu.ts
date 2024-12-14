import { Meal, Recipe } from './types';

const basicMenu: Record<Meal, Recipe> = {
  [Meal.Breakfast]: {
    name: 'Scrambled Eggs with Avocado',
    ingredients: [
      { name: 'egg', amountInGramms: 200 },
      { name: 'avocado', amountInGramms: 100 },
      { name: 'spinach', amountInGramms: 50 },
    ],
    meal: Meal.Breakfast,
    instruction:
      'Whisk eggs and cook in a non-stick pan. Slice avocado and serve with sautéed spinach.',
    calories: 452,
  },
  [Meal.Brunch]: {
    name: 'Cottage Cheese with Walnuts',
    ingredients: [
      { name: 'cottage cheese', amountInGramms: 200 }, // ~180 kcal
      { name: 'walnuts', amountInGramms: 20 }, // ~130 kcal
    ],
    meal: Meal.Brunch,
    instruction: 'Serve cottage cheese topped with chopped walnuts.',
    calories: 310,
  },
  [Meal.Lunch]: {
    name: 'Grilled Chicken with Quinoa and Vegetables',
    ingredients: [
      { name: 'chicken breast', amountInGramms: 150 }, // ~165 kcal
      { name: 'quinoa', amountInGramms: 120 }, // ~220 kcal
      { name: 'broccoli', amountInGramms: 100 }, // ~34 kcal
      { name: 'carrots', amountInGramms: 80 }, // ~33 kcal
    ],
    meal: Meal.Lunch,
    instruction:
      'Grill chicken breast. Cook quinoa according to package instructions. Steam broccoli and carrots.',
    calories: 452,
  },
  [Meal.Snack]: {
    name: 'Greek Yogurt with Berries and Nuts',
    ingredients: [
      { name: 'greek yogurt', amountInGramms: 150 }, // ~100 kcal
      { name: 'blueberries', amountInGramms: 50 }, // ~28 kcal
      { name: 'almonds', amountInGramms: 20 }, // ~120 kcal
    ],
    meal: Meal.Snack,
    instruction:
      'Mix Greek yogurt with fresh blueberries and top with chopped almonds.',
    calories: 248,
  },
  [Meal.Dinner]: {
    name: 'Salmon with Sweet Potato and Asparagus',
    ingredients: [
      { name: 'salmon', amountInGramms: 150 }, // ~250 kcal
      { name: 'sweet potato', amountInGramms: 200 }, // ~180 kcal
      { name: 'asparagus', amountInGramms: 100 }, // ~20 kcal
    ],
    meal: Meal.Dinner,
    instruction:
      'Bake salmon with olive oil and herbs. Roast sweet potato and asparagus.',
    calories: 450,
  },
};

export default basicMenu;
