let colors = new Array();
let colors2 = new Array(20);
let colors3 = new Array('red', 'blue', 'green');

let colors4 = Array(3);
let names = Array('Greg');

let colors5 = ['red', 'blue', 'green'];
let names2 = [];
let values = [1, 2,];

// Array.from() 用于将类数组结构转换为数组实例

console.log(Array.from('Matt')); // [ 'M', 'a', 't', 't' ]

const m = new Map().set(1, 2).set(3, 4);
const s = new Set().add(1).add(2).add(3).add(4);

console.log(m); // Map { 1 => 2, 3 => 4 }
console.log(Array.from(m)); // [ [ 1, 2 ], [ 3, 4 ] ]
console.log(Array.from(s)); // [ 1, 2, 3, 4 ]

const a1 = [1, 2, 3, 4];
const a2 = Array.from(a1);

console.log(a1); // [ 1, 2, 3, 4 ]
console.log(a2); // [ 1, 2, 3, 4 ]

console.log(a1 == a2); // false
console.log(a1 === a2); // false

const iter = {
  *[Symbol.iterator]() {
    yield 1;
    yield 2;
    yield 3;
    yield 4;
  }
};
console.log(Array.from(iter)); // [1, 2, 3, 4]

function getArgsArray() {
  return Array.from(arguments);
}
console.log(getArgsArray(1, 2, 3, 4)); // [ 1, 2, 3, 4]

const arrayLikeObject = {
  0: 1,
  1: 2,
  2: 3,
  3: 4,
  length: 4
};
console.log(arrayLikeObject);
console.log(Array.from(arrayLikeObject));

const a11 = [1, 2, 3, 4];
const a21 = Array.from(a11, x => x**2);
const a31 = Array.from(a11, function(x) { return x**this.exponent}, {exponent:2});
console.log(a21); // [1, 4, 9, 16]
console.log(a31); // [1, 4, 9, 16]

// Array.of() 可以把一组参数转换为数组.
console.log(Array.of(1, 2, 4, 5)); // [ 1, 2, 4, 5 ]
console.log(Array.of(undefined)); // [ undefined ]

const options = [,,,,,];
console.log(options.length); // 5
console.log(options); // [ <5 empty items> ]  --node env

const options2 = [1,,,,5];
for (const option2 of options2) {
  console.log(option2 === undefined);
}
// false
// true
// true
// true
// false

const a = Array.from([,,,]);
for (const val of a) {
  console.log(val === undefined);
}
// true
// true
// true

console.log(Array.of(...[,,,])); // [ undefined, undefined, undefined ]

for (const [index, value] of options2.entries()) {
  console.log(value);
}
// 1
// undefined
// undefined
// undefined
// 5

const options3 = [1,,,,5];
console.log(options3.map(() => 6)); // [ 6, <3 empty items>, 6 ]    --node env
console.log(options3.join('-')); // 1----5

let colors6 = ['red', 'blue', 'green'];
console.log(colors6); // [ 'red', 'blue', 'green' ]
console.log(colors6[0]); // red
colors6[2] = 'black';
colors6[3] = 'brown';
console.log(colors6); // [ 'red', 'blue', 'black', 'brown' ]

let names3 = [];
console.log(colors6.length); // 4 
console.log(names3.length); // 0

let colors7 = ['red', 'blue', 'green'];
colors7.length = 4;
console.log(colors[3]); // undefined


let colors8 = ['red', 'blue', 'green'];
colors8[99] = 'black';
console.log(colors8.length); // 100

if (Array.isArray(colors8)) {
  console.log(true);
}

if (colors8 instanceof Array) {
  console.log(true);
}

let obj = {}

if (obj instanceof Array) {
  console.log('obj is an array');
} else {
  console.log('obj is not an array');
}

if (Array.isArray(obj)) {
  console.log('obj is an array');
} else {
  console.log('obj is not an array');
}

// ES6 Array 原型暴露了3个用于检索数组内容的方法： keys(), values(), entries()
// keys() 返回数组索引的迭代器
// values() 返回数组元素的迭代器
// entries() 返回数组索引/值对的迭代器

const arr1 = ['foo', 'bar', 'baz', 'qux'];
const aKeys = Array.from(arr1.keys());
const aValues = Array.from(arr1.values());
const aEntries = Array.from(arr1.entries());

console.log('keys')
console.log(arr1.keys()); // Object [Array Iterator] {}
console.log(aKeys); // [ 0, 1, 2, 3 ]
console.log('values');
console.log(arr1.values()); // Object [Array Iterator] {}
console.log(aValues); // [ 'foo', 'bar', 'baz', 'qux' ]
console.log('entries');
console.log(arr1.entries()); // Object [Array Iterator] {}
console.log(aEntries); // [ [ 0, 'foo' ], [ 1, 'bar' ], [ 2, 'baz' ], [ 3, 'qux' ] ]

const arr2 = ['foo', 'bar', 'baz', 'qux'];
for (const [idx, element] of arr2.entries()) {
  console.log(idx);
  console.log(element);
}
// 0
// foo
// 1
// bar
// 2
// baz
// 3
// qux

const zeroes = [0, 0, 0, 0, 0];
zeroes.fill(5);
console.log(zeroes); // [ 5, 5, 5, 5, 5 ]
zeroes.fill(0);
console.log(zeroes); // [ 0, 0, 0, 0, 0 ]

zeroes.fill(6, 3);
console.log(zeroes); // [0, 0, 0, 6, 6]
zeroes.fill(0);
console.log(zeroes); // [0, 0, 0, 0, 0]

zeroes.fill(7, 1, 3);
console.log(zeroes); // [ 0, 7, 7, 0, 0 ]
zeroes.fill(0);

// 用8填充大于等于1且小于4的元素
// (-4 + zeroes.length = 1)
// (-1 + zeroes.length = 4)
zeroes.fill(8, -4, -1);
console.log(zeroes); // [ 0, 8, 8, 8, 0 ]
zeroes.fill(0);

zeroes.fill(1, -10, -6);
console.log(zeroes); // [0, 0, 0, 0, 0]

zeroes.fill(1, 10, 15);
console.log(zeroes); // [0, 0, 0, 0, 0]

zeroes.fill(2, 4, 2);
console.log(zeroes); // [0, 0, 0, 0, 0]

zeroes.fill(4, 3, 10);
console.log(zeroes); // [ 0, 0, 0, 4, 4 ]