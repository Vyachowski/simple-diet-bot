install:
	npm ci
dev:
	nodemon --env-file=.env src/index.js
dev-bot:
	nodemon --env-file=.env bin/bot.js
start:
	node --env-file=.env src/index.js
start-bot:
	node --env-file=.env bin/bot.js
publish:
	npm publish --dry-run
test:
	npm run test
lint:
	npx eslint .
lint-fix:
	npx eslint --fix .
test-coverage:
	npm test -- --coverage --coverageProvider=v8
