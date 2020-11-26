const m = new Set();

const s1 = new Set(['val1', 'val2', 'val3']);
console.log(s1.size); // 3
console.log(s1); // Set { 'val1', 'val2', 'val3' }
const s2 = new Set({
  [Symbol.iterator]: function*() {
    yield 'val1';
    yield 'val2';
    yield 'val3';
  }
});

console.log(s2); // Set { 'val1', 'val2', 'val3' }
console.log(s2.size); // 3

const s3 = new Set();
console.log(s3.has('Matt')); // false
console.log(s3.size); // 0

s3.add('Matt').add('Frisbie');
console.log(s3.has('Matt')); // true
console.log(s3.size); // 2

s3.delete('Matt');
console.log(s3.has('Matt')); // false
console.log(s3.has('Frisbie')); // true
console.log(s3.size); // 1

s3.clear();
console.log(s3.has('Matt')); // false
console.log(s3.has('Frisibie')); // false
console.log(s3.size); // 0

const s4 = new Set().add('val1');
s4.add('val2').add('val3');
console.log(s4.size); // 3
console.log(s4); // Set { 'val1', 'val2', 'val3' }

const s5 = new Set();
const functionVal = function() {};
const symbolVal = Symbol();
const objectVal = new Object();
s5.add(functionVal);
s5.add(symbolVal);
s5.add(objectVal);

console.log(s5.has(functionVal)); // true
console.log(s5.has(symbolVal)); // true
console.log(s5.has(objectVal)); // ture

console.log(s5.has(function() {})); // false

const s6 = new Set();
const objVal = {},
      arrVal = [];
s6.add(objVal);
s6.add(arrVal);
objVal.bar = 'bar';
arrVal.push('bar');
console.log(s6.has(objVal)); // true
console.log(s6.has(arrVal)); // true

const s7 = new Set();
s7.add('foo');
console.log(s7.size); // 1
s7.add('foo');
console.log(s7.size); // 1

console.log(s7.delete('foo')); // true
console.log(s7.delete('foo')); // false