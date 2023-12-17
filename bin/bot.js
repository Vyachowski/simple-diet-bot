import { Bot } from 'grammy';
import { getIntroMessages, provideMenuWithGroceryList } from '../src/index.js';

const bot = new Bot(process.env.BOT_TOKEN);

bot.command('start', async (ctx) => {
  const { welcome, features } = getIntroMessages('welcome');

  await ctx.reply(welcome);
  await ctx.reply(features);
});

bot.command('menu', async (ctx) => {
  const menuWithGroceryList = provideMenuWithGroceryList();

  await ctx.reply(menuWithGroceryList.menuText);
  await ctx.reply(menuWithGroceryList.groceryListText);
});

bot.start().then((r) => r).catch((e) => e);
