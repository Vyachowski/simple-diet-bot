import { mealTypes } from './basicCookBook.js';
import capitalize from './utils.js';
// Get welcome messages
const getIntroMessage = (type) => {
  const welcomeMessage = "Hi! Let me introduce you 'Bity Smarty' – a special bot that can provide a healthy diet and a grocery list for your next shopping.\n\n";
  const featureMessage = 'Here is 5 main features of this bot:\n'
    + '1. Save your time: Only 1 hour for cooking per 3 day!\n'
    + '2. No complex equipment. Just a multi cooker to start!\n'
    + '3. Healthy diet with fancy recipes that looks great\n'
    + '4. Most recipes can be easily stored in the fridge or in the freezer\n'
    + '5. And to make it even tastier – It is completely free :)';
  return (type === 'welcome' ? welcomeMessage : featureMessage);
};

// Menu
const generateMenu = (recipesList) => {
  const getRecipesByMealType = (recipes, mealType) => recipes
    .filter((recipe) => recipe.meal.includes(mealType));
  const getRandomArrayIndex = (array) => Math.floor(Math.random() * array.length);
  const getRandomRecipe = (
    recipesByMealType,
  ) => recipesByMealType[getRandomArrayIndex(recipesByMealType)];

  const recipesByMealType = mealTypes.map((meal) => getRecipesByMealType(recipesList, meal));
  const randomMenu = recipesByMealType.flatMap((meal) => getRandomRecipe(meal));

  return mealTypes.reduce((acc, mealType, currentIndex) => (
    { ...acc, [mealType]: randomMenu[currentIndex] }
  ), {});
};

const formatMenu = (menu) => {
  const getMenuLine = (meal, menuVariant) => `${capitalize(meal)}: ${menuVariant[meal].name}`;
  const menuHeader = 'Menu\n\n';
  const menuText = mealTypes
    .map((meal) => getMenuLine(meal, menu))
    .join('\n');
  return `${menuHeader}${menuText}`;
};

// Grocery List
const generateGroceryList = (currentMenu) => {
  const ingredientDuplicated = Object.entries(currentMenu).flatMap(([, meal]) => meal.ingredients);
  return ingredientDuplicated.reduce((acc, currentValue) => {
    acc[currentValue.name] = {
      amount: (acc[currentValue.name] ?? 0) + currentValue.amount,
      unit: currentValue.unit,
    };
    return acc;
  }, {});
};

const formatGroceryList = (currentGroceryList) => {
  const getGroceryListLine = (name, amount, unit) => `– ${capitalize(name)}: ${amount}${unit}`;
  const ingredientsList = Object.entries(currentGroceryList);
  const groceryListHeader = 'Grocery List\n\n';
  const groceryListText = ingredientsList
    .map(
      (
        [name, { amount, unit }],
      ) => getGroceryListLine(name, amount, unit),
    )
    .join('\n');
  return `${groceryListHeader}${groceryListText}`;
};

// Result
const provideMenuWithGroceryList = (recipesList) => {
  const newMenu = generateMenu(recipesList);
  const groceryList = generateGroceryList(newMenu);
  return {
    menuText: formatMenu(newMenu),
    groceryListText: formatGroceryList(groceryList),
  };
};

export {
  getIntroMessage,
  provideMenuWithGroceryList,
};
