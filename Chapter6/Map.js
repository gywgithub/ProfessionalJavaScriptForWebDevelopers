const m = new Map();

const m1 = new Map([
  ["key1", "val1"],
  ["key2", "val2"],
  ["key3", "val3"]
]);

console.log(m1.size); // 3

const m2 = new Map({
  [Symbol.iterator]: function*() {
    yield ["key1", "val1"];
    yield ["key2", "val2"];
    yield ["key3", "val3"];
  }
});

console.log(m2.size); // 3

const m3 = new Map([[]]);
console.log(m3.has(undefined)); // true
console.log(m3.get(undefined)); // undefined

const m4 = new Map();
console.log(m4.has('firstName')); // false
console.log(m4.get('firstName')); // undefined
console.log(m4.size); // 0

m4.set('firstName', 'Matt')
  .set('lastName', 'Frisbie');

console.log(m4.has('firstName')); // true
console.log(m4.get('firstName')); // Matt
console.log(m4.size); // 2

m4.delete('firstName');

console.log(m4.has('firstName')); // false
console.log(m4.has('lastName')); // true
console.log(m4.size); // 1

m4.clear();

console.log(m4.has('firstName')); // false
console.log(m4.has('lastName')); // false
console.log(m4.size); // 0

const m5 = new Map();
const functionKey = function() {};
const symbolKey = Symbol();
const objectKey = new Object();
m5.set(functionKey, 'functionValue');
m5.set(symbolKey, 'symbolValue');
m5.set(objectKey, 'objectValue');
console.log(m5.get(functionKey)); // functionValue
console.log(m5.get(symbolKey)); // symbolValue
console.log(m5.get(objectKey)); // objectValue
console.log(m5.get(function() {})); // undefined

const m6 = new Map();
const objKey = {},
      objVal = {},
      arrKey = [],
      arrVal = [];
m6.set(objKey, objVal);
m6.set(arrKey, arrVal);
objKey.foo = 'foo';
objVal.bar = 'bar';
arrKey.push('foo');
arrVal.push('bar');
console.log(m6.get(objKey)); // { bar: 'bar' }
console.log(m6.get(arrKey)); // [ 'bar' ]

const m7 = new Map();
const a = 0/'',
      b = 0/'',
      pz = +0,
      nz = -0;
console.log(a === b); // false
console.log(pz === nz); // true

m7.set(a, 'foo');
m7.set(pz, 'bar');

console.log(m7.get(b)); // foo
console.log(m7.get(nz)); // bar

const m8 = new Map([
  ['key1', 'val1'],
  ['key2', 'val2'],
  ['key3', 'val3']
]);
console.log(m8.entries === m8[Symbol.iterator]); // true

for (let pair of m8.entries()) {
  console.log(pair);
}
// [ 'key1', 'val1' ]
// [ 'key2', 'val2' ]
// [ 'key3', 'val3' ]

for (let pair of m8[Symbol.iterator]()) {
  console.log(pair);
}
// [ 'key1', 'val1' ]
// [ 'key2', 'val2' ]
// [ 'key3', 'val3' ]

console.log([...m8]); // [ [ 'key1', 'val1' ], [ 'key2', 'val2' ], [ 'key3', 'val3' ] ]
console.log(...m8); // [ 'key1', 'val1' ] [ 'key2', 'val2' ] [ 'key3', 'val3' ] 

m8.forEach((val, key) => console.log(`${key} -> ${val}`));
// key1 -> val1
// key2 -> val2
// key3 -> val3

for (let key of m8.keys()) {
  console.log(key);
}
// key1
// key2
// key3

for (let val of m8.values()) {
  console.log(val);
}
// val1
// val2
// val3

const m9 = new Map([
  ['key1', 'val1']
]);

for (let key of m9.keys()) {
  console.log(key); // key1
  key = 'newKey';
  console.log(key); // newKey
  console.log(m9.get('key1')); // val1
}

const keyObj = {id: 1};
const m10 = new Map([
  [keyObj, 'val1']
]);

for (let key of m10.keys()) {
  key.id = 'newKey';
  console.log(key); // {id: 'newKey'}
  console.log(m10.get(keyObj)); // val1
}
console.log(keyObj); // {id: 'newKey'}