import capitalize from './utils.js';
import { getData } from './data/data.js';

// Welcome message
const getIntroMessages = () => getData('introMessages');

// Menu
const generateMenu = () => {
  const mealTypes = getData('mealTypes');
  const recipesList = getData('recipes');
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
  const mealTypes = getData('mealTypes');
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
const provideMenuWithGroceryList = () => {
  const newMenu = generateMenu();
  const groceryList = generateGroceryList(newMenu);
  return {
    menuText: formatMenu(newMenu),
    groceryListText: formatGroceryList(groceryList),
  };
};

export {
  getIntroMessages,
  provideMenuWithGroceryList,
};
