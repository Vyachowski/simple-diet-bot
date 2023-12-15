#!/usr/bin/env node --env-file=.env
import { Bot } from 'grammy';
import { getIntroMessage, provideMenuWithGroceryList } from '../src/index.js';
import { basicCookBook } from '../src/basicCookBook.js';

const bot = new Bot(process.env.BOT_TOKEN);

bot.command('start', async (ctx) => {
  await ctx.reply(getIntroMessage('welcome'));
  await ctx.reply(getIntroMessage('features'));
});

bot.command('menu', async (ctx) => {
  const menuWithGroceryList = provideMenuWithGroceryList(basicCookBook);

  await ctx.reply(menuWithGroceryList.menuText);
  await ctx.reply(menuWithGroceryList.groceryListText);
});

bot.start().then((r) => r).catch((e) => e);
