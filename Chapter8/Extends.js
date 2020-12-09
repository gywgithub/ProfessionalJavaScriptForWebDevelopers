function SuperType() {
  this.property = true;
}

SuperType.prototype.getSuperValue = function() {
  console.log(this.property);
  return this.property;
}

function SubType() {
  this.subproperty = false;
}

SubType.prototype = new SuperType();

SubType.prototype.getSubValue = function() {
  return this.subproperty;
}

SubType.prototype.getSuperValue = function() {
  return false;
}

let instance = new SubType();
console.log(instance.getSuperValue()); // false

console.log('---');

// 盗用构造函数（constructor stealing）  对象伪装  经典继承
function SuperType() {
  this.colors = ['red', 'blue', 'green'];
}

function SubType() {
  SuperType.call(this);
}

let instance1 = new SubType();
instance1.colors.push('black');
console.log(instance1.colors); // ['red', 'blue', 'green', 'black']

let instance2 = new SubType();
console.log(instance2.colors); // ['red', 'blue', 'green']

// 组合继承
function SuperType2(name) {
  this.name = name;
  this.colors = ['red', 'blue', 'green'];
}

SuperType2.prototype.sayName = function() {
  console.log(this.name);
}

function SubType2(name, age) {
  SuperType2.call(this, name);
  this.age = age;
}

SubType2.prototype = new SuperType2();

SubType2.prototype.sayAge = function() {
  console.log(this.age);
}

let instance3 = new SubType2('Nicholas', 29);
instance3.colors.push('black');
console.log(instance3.colors); // ['red', 'blue', 'green', 'black']
instance3.sayName(); // Nicholas
instance3.sayAge(); // 29

let instance4 = new SubType2('Greg', 27);
console.log(instance4.colors); // ['red', 'blue', 'green']
instance4.sayName(); // Greg
instance4.sayAge(); // 27


// 原型式继承
function object(o) {
  function F() {}
  F.prototype = o;
  return new F();
}

let person = {
  name: 'Nicholas',
  friends: ['Shelby', 'Court', 'Van']
};

let anotherPerson = object(person);
anotherPerson.name = 'Greg';
anotherPerson.friends.push('Rob');

let yetAnotherPerson = object(person);
yetAnotherPerson.name = 'Linda';
yetAnotherPerson.friends.push('Barbie');

console.log(person.friends); // [ 'Shelby', 'Court', 'Van', 'Rob', 'Barbie' ]

let person2 = {
  name: 'Nicholas',
  friends: ['Shelby', 'Court', 'Van']
};
let anotherPerson2 = Object.create(person2);
anotherPerson2.name = 'Greg';
anotherPerson2.friends.push('Rob');

let yetAnotherPerson2 = Object.create(person2);
yetAnotherPerson2.name = 'Linda';
yetAnotherPerson2.friends.push('Barbie');

console.log(person2.friends); // [ 'Shelby', 'Court', 'Van', 'Rob', 'Barbie' ]

console.log('---');

// 寄生式继承（parasitic inheritance）
function createAnother(original) {
  let clone = object(original);
  clone.sayHi = function() {
    console.log('hi');
  };
  return clone;
}

let person3 = {
  name: 'Nicholas',
  friends: ['Shelby', 'Court', 'Van']
}

let anotherPerson3 = createAnother(person3);
anotherPerson3.sayHi(); // hi

// 寄生式组合继承
function SuperType4(name) {
  this.name = name;
  this.colors = ['red', 'blue', 'green'];
}

SuperType4.prototype.sayName = function() {
  console.log(this.name);
};

function SubType4(name, age) {
  SuperType4.call(this, name);
  this.age = age;
}

inheritPrototype(SubType4, SuperType4);

// SubType4.prototype = new SuperType4();
// SubType4.prototype.constructor = SubType4;
SubType4.prototype.sayAge = function() {
  console.log(this.age);
}

function inheritPrototype(subType, superType) {
  let prototype = object(superType.prototype);
  prototype.constructor = subType;
  subType.prototype = prototype;
}

