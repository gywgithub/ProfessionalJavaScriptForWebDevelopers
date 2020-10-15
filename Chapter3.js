const age = 26;
// age = 34;

const name = 'Matt';
if (true) {
  const name = 'Nicholas';
}
console.log(name);

const person = {};
person.name = 'NN';

console.log(person);

let i = 0;
for (const j = 7; i < 5; i++) {
  console.log(j); // 7, 7, 7, 7, 7
}

for (const key in {a: 1, b: 2}) {
  console.log(key); // a, b
}

for (const value of [1, 2, 3, 4, 5]) {
  console.log(value); // 1, 2, 3, 4, 5
}

const message = 'some string';
console.log(typeof message);
console.log(typeof(message));
console.log(typeof 95);

let message2 = 'Hello';
let message2AsBoolean = Boolean(message2);
console.log(message2);
console.log(message2AsBoolean); // true

let result = Number.MAX_VALUE + Number.MAX_VALUE;
console.log(isFinite(result)); // false

console.log(0/0); // NaN
console.log(-0/+0); // NaN

console.log(5/0); // Infinity
console.log(5/-0); // -Infinity

console.log(NaN == NaN); // false

console.log(isNaN(NaN)); // true
console.log(isNaN(10)); // false
console.log(isNaN('10')); // false
console.log(isNaN('blue')); // true
console.log(isNaN(true)); // false

let num1 = Number('hello word'); // NaN
let num2 = Number(''); // 0
let num3 = Number('000111'); // 111
let num4 = Number(true); // 1

let num5 = parseInt('1234blue'); // 1234
let num6 = parseInt(''); // NaN
let num7 = parseInt('0xA'); // 10
let num8 = parseInt(22.5); // 22
let num9 = parseInt('70'); // 70
let num10 = parseInt('0xf'); // 15

let num11 = parseInt('AF', 16); // 175
let num12 = parseInt('10', 2); // 2
let num13 = parseInt('10', 8); // 8
let num14 = parseInt('10', 10); // 10
let num15 = parseInt('10', 16); // 16

let num16 = parseFloat('1235blue'); // 1235
let num17 = parseFloat('0xA'); // 0
let num18 = parseFloat('22.34.5'); // 22.34

let text = 'This is the letter sigma: \u03a3.';
console.log(text); // This is the letter sigma: Σ.
console.log(text.length); // 28

let age2 = 11;
console.log(age2.toString()); // '11'
let found = true;
console.log(found.toString()); // 'true'

let num19 = 10;
console.log(num19.toString()); // '10'
console.log(num19.toString(2)); // '1010'

let value1 = 10;
let value2 = true;
let value3 = null;
let value4;

console.log(String(value1)); // '10'
console.log(String(value2)); // 'true'
console.log(String(value3)); // 'null'
console.log(String(value4)); // 'undefined'

let myMultiLineString = 'first line\nsecond line';
let myMultiLineTemplateLiteral = `first line
second line`;

console.log(myMultiLineString);
console.log(myMultiLineTemplateLiteral);

let value = 5;
let exponent = 'second';
let interpolatedString = value + ' to the ' + exponent + ' power is ' + (value * value);
let interpolatedTemplateLiteral = `${ value } to the ${ exponent } power is ${ value * value }`;
console.log(interpolatedString);
console.log(interpolatedTemplateLiteral);

console.log(`Hello, ${ `World` }!`);
let foo = { toString: () => 'World' };
console.log(foo);
console.log(`Hello, ${ foo }!`);

function capitalize(word) {
  return `${ word[0].toUpperCase() }${ word.slice(1) }`;
}
console.log(`${ capitalize('hello') }, ${ capitalize('world') }!`);

let value11 = '';
function append() {
  value11 = `${ value11 }abc`;
  console.log(value11);
}
append(); // abc
append(); // abcabc
append(); // abcabcabc

console.log('-----------------------------------');

let a = 6;
let b = 9;
// function simpleTag(strings, aValExpression, bValExpression, sumExpression) {
//   console.log(strings);
//   console.log(aValExpression);
//   console.log(bValExpression);
//   console.log(sumExpression);

//   return 'foobar';
// }

function simpleTag(strings, ...expressions) {
  console.log(strings);
  for (const expression of expressions) {
    console.log(expression);
  }
  return 'foobar';
}

function zipTag(strings, ...expressions) {
  return strings[0] + expressions.map((e, i) => `${e}${strings[i + 1]}`).join('');
}

let untaggedResult = `${ a } + ${ b } = ${ a + b }`;
// let taggedResult = simpleTag`${ a } + ${ b } = ${ a + b }`;
let taggedResult = zipTag`${ a } + ${ b } = ${ a + b }`;

console.log(untaggedResult);
console.log(taggedResult);

console.log(`\u00A9`);
console.log(String.raw`\u00A9`);

function printRaw(strings) {
  console.log('Actual characters:');
  for (const string of strings) {
    console.log(string);
  }
  console.log('Escaped characters;');
  for (const rawString of strings.raw) {
    console.log(rawString);
  }
}

printRaw`\u00A9${ 'and' }\n`;
// Actual characters:
// ©


// Escaped characters;
// \u00A9
// \n
