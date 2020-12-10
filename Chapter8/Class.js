class Person {}

const Animal = class {};

class Foo {}

class Bar {
  constructor() {}
}

class Baz {
  get myBaz() {}
}

class Qux {
  static myQux() {}
}

let Person2 = class PersonName {
  identify() {
    console.log(Person2.name, PersonName.name);
  }
}

let p = new Person2();
p.identify(); // PersonName PersonName

console.log(Person2.name); // PersonName

console.log('---');

class Animal3 {}

class Person3 {
  constructor() {
    console.log('person3 ctor');
  }
}

class Vegetable3 {
  constructor() {
    this.color = 'orange';
  }
}

let a3 = new Animal3();
let p3 = new Person3(); // person3 ctor
let v3 = new Vegetable3();
console.log(v3.color); // orange

console.log('===');

class Person4 {
  constructor(name) {
    console.log(arguments.length);
    this.name = name || null;
  }
}

let p41 = new Person4(); // 0
console.log(p41.name); // null

let p42 = new Person4(); // 0
console.log(p42.name); // null

let p43 = new Person4('Jake'); // 1
console.log(p43.name); // Jake

console.log('---');

let classList = [
  class {
    constructor(id) {
      this.id_ = id;
      console.log(`instance ${this.id_}`);
    }
  }
]

function createInstance(classDefinition, id) {
  return new classDefinition(id);
}

let foo = createInstance(classList[0], 3141); // instance 3141
console.log(foo); // { id_: 3141 }

let p5 = new class Foo5 {
  constructor(x) {
    console.log(x);
  }
}('bar');
console.log(p5); // Foo5 {}

console.log('~~~');

class Person6 {
  constructor() {
    this.name = new String('Jack');
    this.sayName = () => console.log(this.name);
    this.nicknames = ['Jack', 'J-Dog'];
  }
}

let p61 = new Person6(),
    p62 = new Person6();

p61.sayName(); // Jack
p62.sayName(); // Jack
console.log(p61.name === p62.name); // false
console.log(p61.sayName === p62.sayName); // false
console.log(p61.nicknames === p62.nicknames); // false

p61.name = p61.nicknames[0];
p62.name = p62.nicknames[1];
p61.sayName(); // Jack
p62.sayName(); // J-Dog

class Person7 {
  constructor() {
    this.locate = () => console.log('instance');
  }

  locate() {
    console.log('prototype');
  }

  getName() {
    console.log('getName()');
  }
}

let p7 = new Person7();
console.log(p7); // Person7 { locate: [Function] }
p7.locate(); // instance
p7.getName(); // getName()
Person7.prototype.locate(); // prototype


console.log('---');

class Person8 {
  set name(newName) {
    this.name_ = newName;
  }
  get name() {
    return this.name_;
  }
}
let p8 = new Person8();
p8.name = 'Jack';
console.log(p8.name);

console.log('===');

class Person9 {
  constructor(age) {
    this.age_ = age;
  }

  sayAge() {
    console.log(this.age_);
  }

  static create() {
    return new Person9(Math.floor(Math.random() * 100));
  }
}
console.log(Person9.create());

console.log('---');

class Person10 {
  *createNicknameIterator() {
    yield 'Jack';
    yield 'Jake';
    yield 'J-Dog';
  }

  static *createJobIterator() {
    yield 'Butcher';
    yield 'Baker';
    yield 'Candlestick maker';
  }
}

let jobIter = Person10.createJobIterator();
console.log(jobIter.next().value);
console.log(jobIter.next().value);
console.log(jobIter.next().value);

let p101 = new Person10();
let nicknameIter = p101.createNicknameIterator();
console.log(nicknameIter.next().value);
console.log(nicknameIter.next().value);
console.log(nicknameIter.next().value);

class Person11 {
  constructor() {
    this.nicknames = ['Jack', 'Jake', 'J-Dog'];
  }

  // *[Symbol.iterator]() {
  //   yield *this.nicknames.entries();
  // }

  [Symbol.iterator]() {
    return this.nicknames.entries();
  }
}

let p11 = new Person11();
for (let [idx, nickname] of p11) {
  console.log(nickname);
}

console.log('---');

class Vehicle {}
class Bus extends Vehicle {}

let b = new Bus();
console.log(b instanceof Bus);
console.log(b instanceof Vehicle);

function Person12() {}
class Engineer extends Person12 {}

let e = new Engineer();
console.log(e instanceof Engineer);
console.log(e instanceof Person12);
