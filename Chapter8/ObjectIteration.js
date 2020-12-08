function Person() {}

Person.prototype.name = 'Nicholas';
Person.prototype.age = 28;
Person.prototype.job = 'Software Engineer';
Person.prototype.sayName = function() {
  console.log(this.name);
};

let keys = Object.keys(Person.prototype);
console.log(keys); // [ 'name', 'age', 'job', 'sayName' ]

let p1 = new Person();
p1.name = 'Rob';
p1.age = 31;
let p1keys = Object.keys(p1);
console.log(p1keys); // [ 'name', 'age' ]

let keys2 = Object.getOwnPropertyNames(Person.prototype);
console.log(keys2); // [ 'constructor', 'name', 'age', 'job', 'sayName' ]

let k1 = Symbol('k1'),
    k2 = Symbol('k2');

let o = {
  1: 1,
  first: 'first',
  [k1]: 'sym2',
  second: 'second',
  0: 0
}

o[k2] = 'sym2';
o[3] = 3;
o.third = 'third';
o[2] = 2;

console.log(Object.getOwnPropertyNames(o)); // [ '0', '1', '2', '3', 'first', 'second', 'third' ]

console.log(Object.getOwnPropertySymbols(o)); // [ Symbol(k1), Symbol(k2) ]

const o2 = {
  foo: 'bar',
  bar: 1,
  qux: {}
};

console.log(Object.values(o2)); // [ 'bar', 1, {} ]
console.log(Object.entries(o2)); // [ [ 'foo', 'bar' ], [ 'bar', 1 ], [ 'qux', {} ] ]

const o3 = {
  qux: {}
};

console.log(Object.values(o3)[0] === o3.qux); // true
console.log(Object.entries(o3)[0][1] === o3.qux); // true

const sym4 = Symbol();
const o4 = {
  [sym4]: 'foo'
};

console.log(Object.values(o4)); // []
console.log(Object.entries((o4))); // []

function Person5() {}
Person5.prototype = {
  name: 'Nicholas',
  age: 28,
  job: 'Software Engineer',
  sayName() {
    console.log(this.name);
  }
}

let friend = new Person5();
console.log(friend);
console.log(friend instanceof Object); // true
console.log(friend instanceof Person5); // true

console.log(friend.constructor == Person5); // false
console.log(friend.constructor == Object); // true

// 原型的动态性 8.2.5