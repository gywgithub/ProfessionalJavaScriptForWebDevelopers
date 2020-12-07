function createPerson(name, age, job) {
  let o = new Object();
  o.name = name;
  o.age = age;
  o.job = job;
  o.sayName = function() {
    console.log(this.name);
  };
  return o;
}

let person1 = createPerson('Nicholas', 28, 'Software Engineer');
console.log(person1);
person1.sayName();

let person2 = createPerson('Greg', 27, 'Doctor');
console.log(person2);
person2.sayName();


function Person(name, age, job) {
  this.name = name;
  this.age = age;
  this.job = job;
  this.sayName = function() {
    console.log(this.name);
  }
}

let person3 = new Person('Nicholas', 28, 'Software Engineer');
let person4 = new Person('Greg', 27, 'Doctor');
person3.sayName();
person4.sayName();

let Person5 = function(name, age, job) {
  this.name = name;
  this.age = age;
  this.job = job;
  this.sayName = function() {
    console.log(this.name);
  }
}
console.log('Person5');
let person6 = new Person5();
person6.sayName(); // undefined

let person7 = new Person;
person7.sayName(); // undefined

let person8 = new Person('Mike', 30, 'Doctor');
person8.sayName(); // Mike

Person5('Greg', 27, 'Doctor');
// window.sayName();

let o2 = new Object();
Person5.call(o2, 'Kristen', 25, 'Nurse');
o2.sayName(); // Kristen

// function Person9() {}
let Person9 = function() {};
Person9.prototype.name = 'Nicholas';
Person9.prototype.age = 28;
Person9.prototype.job = 'Software Engineer';
Person9.prototype.sayName = function() {
  console.log(this.name);
};

let person10 = new Person9();
person10.sayName(); // Nicholas

let person11 = new Person9();
person11.sayName(); // Nicholas

console.log(person10.sayName == person11.sayName); // true

console.log('---');

function Person12() {}

console.log(typeof Person12.prototype); // object
console.log(Person12.prototype); // Person12 {}
console.log(Person12.prototype.constructor === Person12); // true

console.log('===');
console.log(Person12.prototype.__proto__ === Object.prototype); // true
console.log(Person12.prototype.__proto__.constructor === Object); // true
console.log(Person12.prototype.__proto__.__proto__ === null); // true

let person13 = new Person12(),
    person14 = new Person12();
console.log(person13 !== Person12); // true
console.log(person13 !== Person12); // true
console.log(Person12.prototype !== Person12); // true

let biped = {
  numLegs: 2
};
let person15 = {
  name: 'Matt'
};
Object.setPrototypeOf(person15, biped);
Object.setPrototypeOf(person15, biped);
console.log(person15.name); // Matt
console.log(person15.numLegs); // 2
console.log(Object.getPrototypeOf(person15) === biped); // true

