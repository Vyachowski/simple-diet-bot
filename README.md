### Code and linter status
[![Maintainability](https://api.codeclimate.com/v1/badges/486fccb0b96e9919931a/maintainability)](https://codeclimate.com/github/Vyachowski/simple-diet-bot/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/486fccb0b96e9919931a/test_coverage)](https://codeclimate.com/github/Vyachowski/simple-diet-bot/test_coverage)

# Bity Smarty – Healthy diet bot

Easy-to-use helper for maintain a healthy diet.

## Goals & Description

First of all this project was created for educational purposes, so I will not use a lot of third-party libraries (like lodash).

The main goal of this project is to create a special bot that can provide an international menu,
that can be cooked with a small amount of time (less than an hour per day).
Also, this diet should be healthy, including all recommended nutrients and tasty of course :)

Some restrictions for this project:
* The dishes should be able to be stored in fridge (or particularly in a freezer)
* Just a one-hour enjoyable cooking for three days of healthy diet
* Low cooking or zero cooking recipes
* Multi-cooker friendly (one-pot recipes – high priority)
* Ru and Eng version, of course :)

## Current features

- [x] Menu with my favorite meals
- [x] Get a grocery list for easy shopping

## Getting Started

Bot is available in telegram: [Bity Smarty Bot](https://t.me/bity_smarty_bot)

### Key dependencies

* Node.js > 20.1.0
* Grammy = 1.19.2

## Roadmap

### Version 0.1 – Echo diet bot (One menu variant)

#### Features:
1. Provide a preloaded mono diet menu from js object
2. A plain grocery list without grouping in sections
3. Recipes only for multi cooker
4. English version
5. One user only

#### Programming tasks:
* Create a CI/CD integration: **GitHub Actions & Render**
* Create a data module with preloaded menu: **JS Object**
* Telegram bot that fetch a data and display it in a bot: **Grammy framework**

### Version 0.2 – Echo diet bot (3 menus variants)

#### Features:
1. Provide a 3-day menu from preloaded variants with pinning in chat
2. A plain grocery list with grouping in sections
3. Recipes mostly for multi cooker (one-pot recipes)
4. English version
5. One user only

#### Programming tasks:
* Create a database with different recipes: **JsonDB**
* Update telegram bot with ability to pin messages

## Authors

Feel free to contact me and help with the project

Slava Haikin
[@vyachowski](https://twitter.com/vyachowski)

## License

This project is licensed under the MIT License - just because it sounds great :)
