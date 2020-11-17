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