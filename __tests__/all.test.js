import capitalize from '../src/utils.js';
import {getIntroMessage} from "../src/index.js";

// Utilities tests
test('Capitalize: Functioning, Wrong data type, starts with a number', () => {
  expect(capitalize('source busters')).toEqual('Source busters');
  expect(capitalize('')).toEqual('');
  expect(() => capitalize(1)).toThrow('Cannot read properties of undefined (reading \'toUpperCase\')');
});

// Application
test('Basic functions: Welcome message, get menu and grocery list', () => {
  const welcomeMessage = getIntroMessage('welcome');
  const featuresMessage = getIntroMessage('features');
  expect(welcomeMessage).toContain('Bity Smarty');
  expect(featuresMessage).toContain('Save your time');
});
