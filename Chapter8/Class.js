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

console.log('---');

// 继承内置类型
class SuperArray extends Array {
  shuffle() {
    // 洗牌算法
    for (let i = this.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this[i], this[j]] = [this[j], this[i]];
    }
  }
}
let a = new SuperArray(1, 2, 3, 4, 5);
console.log(a instanceof Array);
console.log(a instanceof SuperArray);

console.log(a);
a.shuffle();
console.log(a);

let a1 = new SuperArray(1, 2, 3, 4, 5);
let a2 = a1.filter(x => !!(x%2));
console.log(a1);
console.log(a2);

console.log('---');

class SuperArray2 extends Array {
  static get [Symbol.species]() {
    return Array;
  }
}
let a21 = new SuperArray2(1, 2, 3, 4, 5);
let a22 = a21.filter(x => !!(x%2));
console.log(a21);
console.log(a22);
console.log(a21 instanceof SuperArray2); // true
console.log(a22 instanceof SuperArray2); // false

console.log('===');

class Vehicle3 {}
function getParentClass3() {
  console.log('evaluated expression');
  return Vehicle3;
}
class Bus3 extends getParentClass3() {}

console.log('---');

class Vehicle4 {}

let FooMixin = (Superclass) => class extends Superclass {
  foo() {
    console.log('foo');
  }
};
let BarMixin = (Superclass) => class extends Superclass {
  bar() {
    console.log('bar');
  }
};
let BazMixin = (Superclass) => class extends Superclass {
  baz() {
    console.log('baz');
  }
};
class Bus4 extends FooMixin(BarMixin(BazMixin(Vehicle4))) {}
let b4 = new Bus4();
b4.foo();
b4.bar();
b4.baz();

function mix(BaseClass, ...Mixins) {
  return Mixins.reduce((accumulator, current) => current(accumulator), BaseClass);
}

class Bus42 extends mix(Vehicle, FooMixin, BarMixin, BazMixin) {}
let b42 = new Bus42();
b42.foo();
b42.bar();
b42.baz();
