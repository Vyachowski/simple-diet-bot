#!/usr/bin/env node --env-file=.env
import { Bot } from 'grammy';

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

const bot = new Bot(process.env.BOT_TOKEN);

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id;

  bot.sendMessage(chatId, `ID: ${userId}. Chat ID: ${chatId}\n\n${getIntroMessage('welcome')}`).then(() => true);
});
