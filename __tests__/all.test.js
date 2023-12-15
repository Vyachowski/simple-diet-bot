import capitalize from "../src/utils.js";
// Utilities tests
test('Capitalize: Functioning, Wrong data type, starts with a number', () => {
  expect(capitalize('source busters')).toEqual('Source busters');
  expect(capitalize('')).toEqual('');
  expect(() => capitalize(1)).toThrow('Cannot read properties of undefined (reading \'toUpperCase\')');
})
