function sum(num1, num2) {
  return num1 + num2;
}

console.log(sum(10, 10));

let anotherSum = sum;
console.log(anotherSum(10, 10));

sum = null;
console.log(anotherSum(10, 10));

function foo() {}
let bar = function() {};
let baz = () => {};
console.log(foo.name); // foo
console.log(baz.name); // baz
console.log(bar.name); // baz
console.log((() => {}).name); // （空字符串）
console.log((new Function()).name); // anonymous

console.log('---');

function foo2() {}
console.log(foo2.bind(null).name); // bound foo2

let dog2 = {
  years: 1,
  get age() {
    return this.years;
  },
  set age(newAge) {
    this.years = newAge;
  }
};

let propertyDescriptor = Object.getOwnPropertyDescriptor(dog2, 'age');
console.log(propertyDescriptor.get.name); // get age
console.log(propertyDescriptor.set.name); // set age

function sayHi(name, message) {
  console.log('Hello ' + name + ' , ' + message);
}

function sayHi() {
  console.log('Hello ' + arguments[0] + ' , ' + arguments[1]);
}

function howManyArgs() {
  console.log(arguments.length);
}

howManyArgs('string', 45); // 2
howManyArgs(); // 0
howManyArgs(12); // 1

function doAdd() {
  if (arguments.length === 1) {
    console.log(arguments[0] + 10);
  } else if (arguments.length === 2) {
    console.log(arguments[0] + arguments[1]);
  }
}
doAdd(10); // 20
doAdd(30, 20); // 50

function makeKing(name) {
  name = (typeof name !== 'undefined') ? name: 'Henry';
  return `King ${name} VIII`;
}

console.log(makeKing());
console.log(makeKing('Louis'));

function makeKing2(name = 'Henry') {
  return `King ${name} VIII`;
}
console.log(makeKing2('Louis'));
console.log(makeKing2());

console.log('===');

let romanNumerals = ['I', 'II', 'III', 'IV', 'V', 'VI'];
let ordinality = 0;
function getNumerals() {
  return romanNumerals[ordinality++];
}
function makeKing3(name = 'Henry', numerals = getNumerals()) {
  return `King ${name} ${numerals}`;
}
console.log(makeKing3()); // King Henry I
console.log(makeKing3('Lonis', 'XVI')); // King Lonis XVI
console.log(makeKing3()); // King Henry II
console.log(makeKing3()); // King Henry III