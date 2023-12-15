import { Bot } from 'grammy';
import * as fs from 'fs';
import { getIntroMessage, provideMenuWithGroceryList } from '../src/index.js';

const basicRecipes = JSON
  .parse(fs.readFileSync('./src/basicCookbook.json', 'utf-8'))
  .recipes;

const bot = new Bot(process.env.BOT_TOKEN);

bot.command('start', async (ctx) => {
  await ctx.reply(getIntroMessage('welcome'));
  await ctx.reply(getIntroMessage('features'));
});

bot.command('menu', async (ctx) => {
  const menuWithGroceryList = provideMenuWithGroceryList(basicRecipes);

  await ctx.reply(menuWithGroceryList.menuText);
  await ctx.reply(menuWithGroceryList.groceryListText);
});

bot.start().then((r) => r).catch((e) => e);
