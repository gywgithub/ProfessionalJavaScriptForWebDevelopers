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

console.log('------------------------------------');

let sym = Symbol();
console.log(typeof sym); // symbol

let genericSymbol = Symbol();
let otherGenericSymbol = Symbol();

let fooSymbol = Symbol('foo');
let otherFooSymbol = Symbol('foo');

console.log(genericSymbol == otherGenericSymbol); // false
console.log(fooSymbol == otherFooSymbol); // false

console.log(genericSymbol); // Symbol()
console.log(fooSymbol); //  Symbol(foo)

let myBoolean = new Boolean();
console.log(typeof myBoolean); // 'object'

let myString = new String();
console.log(typeof myString); // 'object'

let myNumber = new Number();
console.log(typeof myNumber); // 'object'

// let mySymbol = new Symbol(); // TypeError: Symbol is not a constructor
// console.log(mySymbol);

let mySymbol = Symbol();
let myWrappedSymbol = Object(mySymbol);
console.log(typeof myWrappedSymbol); // 'object'

let fooGlobalSymbol = Symbol.for('foo');
console.log(typeof fooGlobalSymbol); // 'symbol'

let fooGlobalSymbol2 = Symbol.for('foo');
let otherFooGlobalSymbol2 = Symbol.for('foo');
console.log(fooGlobalSymbol2 === otherFooGlobalSymbol2); // true

let localSymbol = Symbol('foo');
let globalSymbol = Symbol.for('foo');
console.log(localSymbol === globalSymbol); // false

let emptyGlobalSymbol = Symbol.for();
console.log(emptyGlobalSymbol);

let s = Symbol.for('foo');
console.log(Symbol.keyFor(s)); // foo

let s2 = Symbol('bar');
console.log(Symbol.keyFor(s2)); // undefined

// Symbol.keyFor(123); // TypeError: 123 is not a symbol

// ********** Start ***********
let s3 = Symbol('foo'),
    s4 = Symbol('bar'),
    s5 = Symbol('baz'),
    s6 = Symbol('qux');

let o = {
  [s3]: 'foo val'
};

// o[s3] = 'foo val';
console.log(o); // { [Symbol(foo)]: 'foo val' }

Object.defineProperty(o, s4, {value: 'bar val'});
console.log(1);
console.log(o); // { [Symbol(foo)]: 'foo val' } 提示： 这里为本地node环境输出结果。Chrome 浏览器结果为：{Symbol(foo): 'foo val',Symbol(bar): 'bar val' }

Object.defineProperties(o, {
  [s5]: {value: 'baz val'},
  [s6]: {value: 'qux val'}
});
console.log(o); // { [Symbol(foo)]: 'foo val' } 提示： 这里为本地node环境输出结果。Chrome 浏览器结果为：{Symbol(foo): 'foo val',Symbol(bar): 'bar val', Symbol(baz): 'baz val', Symbol(qux): 'qux val' }


console.log('-------------------------------');

let s7 = Symbol('foo'),
    s8 = Symbol('bar');

let o1 = {
  [s7]: 'foo val',
  [s8]: 'bar val',
  baz: 'baz val',
  qux: 'qux val'
};

console.log(Object.getOwnPropertySymbols(o1)); // [ Symbol(foo), Symbol(bar) ]
console.log(Object.getOwnPropertyNames(o1)); // [ 'bar', 'qux' ]
console.log(Object.getOwnPropertyDescriptors(o1)); // {bar: {...}, qux: {...}, [Symbol(foo)]: {...}, [Symbol(bar): {...}]} Node.  Chrome: {baz: {…}, qux: {…}, Symbol(foo): {…}, Symbol(bar): {…}}
console.log(Reflect.ownKeys(o1)); // [ 'baz', 'qux', Symbol(foo), Symbol(bar) ]

let o2 = {
  [Symbol('foo')]: 'foo val',
  [Symbol('bar')]: 'bar val'
};

console.log(o2); // { [Symbol(foo)]: 'foo val', [Symbol(bar)]: 'bar val' }

let barSymbol = Object.getOwnPropertySymbols(o2).find((symbol) => symbol.toString().match(/bar/));
console.log(barSymbol); // Symbol(bar)

console.log('--------------------------------------');

class Foo {
  async *[Symbol.asyncIterator]() {}
}

let f = new Foo();

console.log(f[Symbol.asyncIterator]()); // Node: Object [AsyncGenerator] {}   Chrome: AsyncGenerator {<suspended>}

// *********** End ************  Chrome 浏览器和 《JavaScript 高级程序设计 （第4版）》效果一致

class Emitter {
  constructor(max) {
    this.max = max;
    this.asyncIdx = 0;
  }

  async *[Symbol.asyncIterator]() {
    while(this.asyncIdx < this.max) {
      yield new Promise((resolve) => resolve(this.asyncIdx++));
    }
  }
}

async function asyncCount() {
  let emitter = new Emitter(5);

  for await(const x of emitter) {
    console.log(x);
  }
}

// asyncCount()
// 0
// 1
// 2
// 3
// 4

console.log('---------------------------------------');

function Foo2() {}
let f2 = new Foo2();
console.log(f2 instanceof Foo2); // true
console.log(Foo2[Symbol.hasInstance](f2)); // true

class Bar2 {}
class Baz2 extends Bar2 {
  static [Symbol.hasInstance]() {
    return false;
  }
}
let b2 = new Bar2();
console.log(b2 instanceof Bar2); // true
console.log(Bar2[Symbol.hasInstance](b2)); // true
console.log(Baz2[Symbol.hasInstance](b2)); // false
console.log(b2 instanceof Baz2); // false

let initial = ['foo'];
let array = ['bar'];
console.log(array[Symbol.isConcatSpreadable]); // undefined
console.log(initial.concat(array)); // ['foo', 'bar']
array[Symbol.isConcatSpreadable] = false;
console.log(initial.concat(array)); // ['foo', ['bar', [Symbol(Symbole.isConcatSpreadable)]: false ]]

console.log('-----');

let arrayLikeObject = { length: 1, 0: 'bar' };
console.log(arrayLikeObject[Symbol.isConcatSpreadable]); // undefined
console.log(initial.concat(arrayLikeObject)); // ['foo', {...}]
arrayLikeObject[Symbol.isConcatSpreadable] = true;
console.log(initial.concat(arrayLikeObject)); // ['foo', 'baz']

console.log('=====');

let otherObject = new Set().add('qux');
console.log(otherObject[Symbol.isConcatSpreadable]); // undefined
console.log(initial.concat(otherObject)); // ['foo', Set(1)]
otherObject[Symbol.isConcatSpreadable] = true;
console.log(initial.concat(otherObject)); // ['foo']

console.log('*****');

console.log(RegExp.prototype[Symbol.match]); // [Function: [Symbol.match]]

console.log('foobar'.match(/bar/)); // [ 'bar', index: 3, input: 'foobar', groups: undefined]

console.log('#####');

class FooMatcher {
  static [Symbol.match](target) {
    return target.includes('foo');
  }
}

console.log('foobar'.match(FooMatcher)); // true
console.log('barbaz'.match(FooMatcher)); // false

class StringMatcher {
  constructor(str) {
    this.str = str;
  }
  [Symbol.match](target) {
    return target.includes(this.str);
  }
}

console.log('foobar'.match(new StringMatcher('foo'))); // true
console.log('barbaz'.match(new StringMatcher('qux'))); // false
console.log('foobar'.match(new StringMatcher('bar'))); // true

console.log('@@@@@');

console.log(RegExp.prototype[Symbol.replace]); // [Function: [Symbol.replace]]
console.log('foobarbaz'.replace(/bar/, 'qux')); // fooquxbaz

class FooReplacer {
  static [Symbol.replace](target, replacement) {
    return target.split('foo').join(replacement);
  }
}

console.log('barfoobaz'.replace(FooReplacer, 'qux')); // barquxbaz

class StringReplacer {
  constructor(str) {
    this.str = str;
  }

  [Symbol.replace](target, replacement) {
    return target.split(this.str).join(replacement);
  }
}

console.log('barfoobaz'.replace(new StringReplacer('foo'), 'qux')); // barquxbaz

console.log('&&&&&');

console.log(RegExp.prototype[Symbol.search]); // [Function: [Symbol.search]]
console.log('foobar'.search(/bar/)); // 3

class FooSearcher {
  static [Symbol.search](target) {
    return target.indexOf('foo');
  }
}

console.log('foobar'.search(FooSearcher)); // 0
console.log('barfoo'.search(FooSearcher)); // 3
console.log('barbaz'.search(FooSearcher)); // -1

class StringSearcher {
  constructor(str) {
    this.str = str;
  }

  [Symbol.search](target) {
    return target.indexOf(this.str);
  }
}

console.log('foobar'.search(new StringSearcher('foo'))); // 0
console.log('barfoo'.search(new StringSearcher('foo'))); // 3
console.log('barbaz'.search(new StringSearcher('qux'))); // -1