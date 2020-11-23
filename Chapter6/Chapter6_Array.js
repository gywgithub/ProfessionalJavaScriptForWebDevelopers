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

let ints,
    reset = () => ints = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
reset();

console.log(ints); // [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ]

ints.copyWithin(5);
console.log(ints); // [ 0, 1, 2, 3, 4, 0, 1, 2, 3, 4 ]
reset();

ints.copyWithin(0, 5);
console.log(ints); // [ 5, 6, 7, 8, 9, 5, 6, 7, 8, 9 ]
reset();

ints.copyWithin(2, 0, 6);
console.log(ints); // [ 0, 1, 0, 1, 2, 3, 4, 5, 8, 9 ]
reset();

ints.copyWithin(-4, -7, -3);
// 等价于 ints.copyWithin((-4 + 10), (-7 + 10), (-3 + 10));
// ints.copyWithin(6, 3, 7);
console.log(ints); // [0, 1, 2, 3, 4, 5, 3, 4, 5, 6]
reset();

// 索引过低，忽略
ints.copyWithin(1, -15, -12);
console.log(ints); // [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ]
reset();

// 索引过高，忽略
ints.copyWithin(1, 12, 15);
console.log(ints); // [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ]
reset();

// 索引反向，忽略
ints.copyWithin(2, 4, 2);
console.log(ints); // [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ]
reset();

// 索引部分可用，复制，填充可用部分
ints.copyWithin(4, 7, 10);
console.log(ints); // [ 0, 1, 2, 3, 7, 8, 9, 7, 8, 9 ]

let colors9 = ['red', 'blue', 'green'];
console.log(colors9.toString()); // red,blue,green
console.log(colors9.valueOf()); // [ 'red', 'blue', 'green' ]
console.log(colors9); // [ 'red', 'blue', 'green' ]

let person1 = {
  toLocaleString() {
    return 'Nikolaos';
  },
  toString() {
    return 'Nicholas';
  }
};

let person2 = {
  toLocaleString() {
    return 'Grigorios';
  },
  toString() {
    return 'Greg';
  }
};

let people = [person1, person2];
console.log(people);
// [ { toLocaleString: [Function: toLocaleString],
// toString: [Function: toString] },
// { toLocaleString: [Function: toLocaleString],
// toString: [Function: toString] } ]

console.log(people.toString()); // Nicholas,Greg
console.log(people.toLocaleString()); // Nikolaos,Grigorios

let colors10 = ['red', 'blue', 'green'];
console.log(colors10.join(',')); // red,blue,green
console.log(colors10.join('||')); // red||blue||green

// 栈是一种后进先出（LIFO，Last-In-First-OUt）的结构。
let colors11 = new Array();
let count11 = colors11.push('red', 'green');
console.log(count11); // 2
count11 = colors11.push('black');
console.log(count11); // 3

let item = colors11.pop();
console.log(item); // black
console.log(colors11.length); // 2

// 队列以先进先出（FIFO，First-In-First-Out）形式限制访问
let colors12 = new Array();
let count12 = colors12.push('red', 'green');
console.log(colors12); // [ 'red', 'green' ]
console.log(count12); // 2

count12 = colors12.push('black');
console.log(count12); // 3
console.log(colors12); // [ 'red', 'green', 'black' ]

let item12 = colors12.shift();
console.log(item12); // red
console.log(colors12.length); // 2

let colors13 = new Array();
let count13 = colors13.unshift('red', 'green');
console.log(count13); // 2

count13 = colors13.unshift('black');
console.log(colors13); // [ 'black', 'red', 'green' ]

let item13 = colors13.pop();
console.log(item13); // green
console.log(colors13.length); // 2

let values2 = [1, 2, 3, 4, 5];
console.log(values2); // [ 1, 2, 3, 4, 5 ]
values2.reverse();
console.log(values2); // [ 5, 4, 3, 2, 1 ]

let values3 = [0, 1, 5, 10, 15];
console.log(values3); // [ 0, 1, 5, 10, 15 ]
values3.sort();
console.log(values3); // [ 0, 1, 10, 15, 5 ]

// function compare(value1, value2) {
//   if (value1 < value2) {
//     return -1;
//   } else if (value1 > value2) {
//     return 1;
//   } else {
//     return 0;
//   }
// }

// 如果数组元素是数字，比较函数简洁写法
function compare(value1, value2) {
  return value1 - value2;
}

values3.sort(compare);
console.log(values3); // [ 0, 1, 5, 10, 15 ]

let values4 = [0, 1, 5, 10, 15];
values4.sort((a, b) => a < b ? 1 : a > b ? -1 : 0);
console.log(values4); // [ 15, 10, 5, 1, 0 ]

let colors14 = ['red', 'green', 'blue'];
let colors15 = colors14.concat('yellow', ['black', 'brown']);
console.log(colors14); // [ 'red', 'green', 'blue' ]
console.log(colors15); // [ 'red', 'green', 'blue', 'yellow', 'black', 'brown' ]

console.log('---');

let colors16 = ['red', 'green', 'blue'];
let newColors6 = ['black', 'brown'];
let moreNewColors = {
  [Symbol.isConcatSpreadable]: true,
  length: 2,
  0: 'pink',
  1: 'cyan'
};
newColors6[Symbol.isConcatSpreadable] = false;

// 强制不打平数组
let colors17 = colors16.concat('yellow', newColors6);

// 强制打平类数组对象
let colors18 = colors16.concat(moreNewColors);

console.log(colors16); // [ 'red', 'green', 'blue' ]
console.log(colors17); // [ 'red',
// 'green',
// 'blue',
// 'yellow',
// [ 'black', 'brown', [Symbol(Symbol.isConcatSpreadable)]: false ] ]
console.log(colors18); // [ 'red', 'green', 'blue', 'pink', 'cyan' ]

let colors19 = ['red', 'green', 'blue', 'yellow', 'purple'];
let colors20 = colors19.slice(1);
let colors21 = colors19.slice(1, 4);
console.log(colors19); // [ 'red', 'green', 'blue', 'yellow', 'purple' ]
console.log(colors20); // [ 'green', 'blue', 'yellow', 'purple' ]
console.log(colors21); // [ 'green', 'blue', 'yellow' ]

console.log('===');

let colors22 = ['red', 'green', 'blue'];
let removed = colors22.splice(0, 1);
console.log(colors22); // ['green', 'blue']
console.log(removed); // ['red']

removed = colors22.splice(1, 0, 'yellow', 'orange');
console.log(colors22); // [ 'green', 'yellow', 'orange', 'blue' ]
console.log(removed); // []

removed = colors22.splice(1, 1, 'red', 'purple');
console.log(colors22); // [ 'green', 'red', 'purple', 'orange', 'blue' ]
console.log(removed); // [ 'yellow' ]

let numbers = [1, 2, 3, 4, 5, 4, 3, 2, 1];
console.log(numbers.indexOf(4)); // 3
console.log(numbers.lastIndexOf(4)); // 5
console.log(numbers.includes(4)); // true

console.log(numbers.indexOf(4, 4)); // 5
console.log(numbers.lastIndexOf(4, 4)); // 3
console.log(numbers.includes(4, 7)); // false

let person3  = { name: 'Nicholas' };
let people3 = [{ name: 'Nicholas' }];
let morePeople = [person3];

console.log(people3.indexOf(person3)); // -1
console.log(morePeople.indexOf(person3)); // 0
console.log(people3.includes(person3)); // false
console.log(morePeople.includes(person3)); // true

const people4 = [
  {
    name: 'Matt',
    age: 27
  },
  {
    name: 'Nicholas',
    age: 29
  }
];

console.log(people4.find((element, index, array) => element.age < 28)); // { name: 'Matt', age: 27 }
console.log(people4.findIndex((element, index, array) => element.age < 28)); // 0

const evens = [2, 4, 6];
evens.find((element, index, array) => {
  console.log(element);
  console.log(index);
  console.log(array);
  return element === 4;
})

console.log('~~~');

let numbers2 = [1, 2, 3, 4, 5, 4, 3, 2, 1];
let everyResult = numbers2.every((item, index, array) => item > 2);
console.log(everyResult); // false

let someResult = numbers2.some((item, index, array) => item > 2);
console.log(someResult); // true

let filterResult = numbers2.filter((item, index, array) => item > 2);
console.log(filterResult); // [ 3, 4, 5, 4, 3 ]

let mapResult = numbers2.map((item, index, array) => item * 2);
console.log(mapResult); // [ 2, 4, 6, 8, 10, 8, 6, 4, 2 ]

numbers2.forEach((item, index, array) => {
  console.log(item)
});

let values5 = [1, 2, 3, 4, 5];
let sum5 = values5.reduce((prev, cur, index, array) => prev + cur);
console.log(sum5);

let sum6 = values5.reduceRight(function(prev, cur, index, array) {
  return prev + cur;
});
console.log(sum6);

const buf = new ArrayBuffer(16);
console.log(buf.byteLength); // 16

const buf1 = new ArrayBuffer(16);
const buf2 = buf1.slice(4, 12);
console.log(buf2.byteLength); // 8

const buf3 = new ArrayBuffer(16);
const fullDataView = new DataView(buf3);
console.log(fullDataView.byteOffset); // 0
console.log(fullDataView.byteLength); // 16
console.log(fullDataView.buffer === buf3); // true

const firstHalfDataView = new DataView(buf3, 0, 8);
console.log(firstHalfDataView.byteOffset); // 0
console.log(firstHalfDataView.byteLength); // 8
console.log(firstHalfDataView.buffer === buf3); // true

const secondHalfDataView = new DataView(buf3, 8);
console.log(secondHalfDataView.byteOffset); // 8
console.log(secondHalfDataView.byteLength); // 8
console.log(secondHalfDataView.buffer === buf3); // true

const buf4 = new ArrayBuffer(2);
const view = new DataView(buf4);

console.log(view.getInt8(0)); // 0
console.log(view.getInt8(1)); // 0
console.log(view.getInt16(0)); // 0

view.setUint8(0, 255);
view.setUint8(1, 0xFF);

console.log(view.getInt16(0)); // -1

console.log('###');

const buf5 = new ArrayBuffer(2);
const view5 = new DataView(buf5);
view5.setUint8(0, 0x80);
view5.setUint8(1, 0x01);

console.log(view5.getUint16(0)); // 32769

console.log(view5.getUint16(0, true)); // 384

view5.setUint16(0, 0x0004);

console.log(view5.getUint8(0)); // 0
console.log(view5.getUint8(1)); // 4

view5.setUint16(0, 0x0002, true);
console.log(view5.getUint8(0)); // 2
console.log(view5.getUint8(1)); // 0

const buf6 = new ArrayBuffer(6);
const view6 = new DataView(buf6);
// view6.getInt32(4); // RangeError: Offset is outside the bounds of the DataView

// view6.getInt32(8); // RangeError: Offset is outside the bounds of the DataView

// view6.getInt32(-1); // RangeError: Offset is outside the bounds of the DataView

// view6.setInt32(4, 123); // RangeError: Offset is outside the bounds of the DataView

const buf7 = new ArrayBuffer(1);
const view7 = new DataView(buf7);
view7.setInt8(0, 1.5);
console.log(view7.getInt8(0));
view7.setInt8(0, 'f');
console.log(view7.getInt8(0));
// view7.setInt8(0, Symbol()); // TypeError: Cannot convert a Symbol value to a number

const buf8 = new ArrayBuffer(12);
const ints8 = new Int32Array(buf8);
console.log(ints8.length); // 3

const ints9 = new Int32Array(6);
console.log(ints9.length); // 6
console.log(ints9.buffer.byteLength); // 24

const ints10 = new Int32Array([2, 4, 6, 8]);
console.log(ints10.length); // 4
console.log(ints10.buffer.byteLength); // 16
console.log(ints10[2]); // 6

const ints11 = new Int16Array(ints10);
console.log(ints11.length); // 4
console.log(ints11.buffer.byteLength); // 8
console.log(ints11[2]); // 6

const ints12 = Int16Array.from([3, 5, 7, 9]);
console.log(ints12.length); // 4
console.log(ints12.buffer.byteLength); // 8
console.log(ints12[2]); // 7

const floats = Float32Array.of(3.14, 2.718, 1.618);
console.log(floats.length); // 3
console.log(floats.buffer.byteLength); // 12
console.log(floats[2]); // 1.6180000305175781

console.log(Int16Array.BYTES_PER_ELEMENT); // 2
console.log(Int32Array.BYTES_PER_ELEMENT); // 4

const ints13 = new Int32Array(1),
      floats13 = new Float64Array(1);

console.log(ints13.BYTES_PER_ELEMENT); // 4
console.log(floats13.BYTES_PER_ELEMENT); // 8

const ints14 = new Int32Array(4);
console.log(ints14[0]); // 0
console.log(ints14[1]); // 0
console.log(ints14[2]); // 0
console.log(ints14[3]); // 0

const ints15 = new Int16Array([1, 2, 3]);
const doubleints = ints15.map(x => 2*x);
console.log(doubleints instanceof Int16Array); // true

const ints16 = new Int16Array([1, 2, 3]);
for (const int of ints16) {
  console.log(int);
}
console.log(Math.max(...ints16)); // 3

const container = new Int16Array(8);
container.set(Int8Array.of(1, 2, 3, 4));
console.log(container); // Int16Array [ 1, 2, 3, 4, 0, 0, 0, 0 ]

container.set([5, 6, 7, 8], 4);
console.log(container); // Int16Array [ 1, 2, 3, 4, 5, 6, 7, 8 ]

// container.set([5, 6, 7, 8], 7); // RangeError: Source is too large

const source = Int16Array.of(2, 4, 6, 8);
const fullCopy = source.subarray();
console.log(fullCopy); // Int16Array [ 2, 4, 6, 8 ]

const halfCopy = source.subarray(2);
console.log(halfCopy); // Int16Array [ 6, 8 ]

const partialCopy = source.subarray(1, 3);
console.log(partialCopy); // Int16Array [ 4, 6 ]

// 定型函数拼接函数
function typedArrayConcat(typedArrayConstructor, ...typedArrays) {
  const numElements = typedArrays.reduce((x, y) => (x.length || x) + y.length);
  const resultArray = new typedArrayConstructor(numElements);
  let currentOffset = 0;
  typedArrays.map(x => {
    resultArray.set(x, currentOffset);
    currentOffset += x.length;
  });
  return resultArray;
}

const concatArray = typedArrayConcat(Int32Array, Int8Array.of(1, 2, 3), Int16Array.of(4, 5, 6), Float32Array.of(7, 8, 9));
console.log(concatArray); // Int32Array [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ]
console.log(concatArray instanceof Int32Array); // true

const ints17 = new Int8Array(2);
const unsignedInts = new Uint8Array(2);
unsignedInts[1] = 256;
console.log(unsignedInts); // Uint8Array [ 0, 0 ]
unsignedInts[1] = 511;
console.log(unsignedInts); // Uint8Array [ 0, 255 ]

unsignedInts[1] = -1;
console.log(unsignedInts); // Uint8Array [ 0, 255 ]

ints17[1] = 128;
console.log(ints17); // Int8Array [ 0, -128 ]

ints17[1] = 255;
console.log(ints17); // Int8Array [ 0, -1 ]

const clampedInts = new Uint8ClampedArray([-1, 0, 255, 256]);
console.log(clampedInts); // Uint8ClampedArray [ 0, 0, 255, 255 ]