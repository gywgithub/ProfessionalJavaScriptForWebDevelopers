let values = [1, 2, 3, 4];
function getSum() {
  let sum = 0;
  for (let i = 0; i < arguments.length; ++i) {
    sum += arguments[i];
  }
  return sum;
}
console.log(getSum(...values));
console.log(getSum(-1, ...values, 5));

function countArguments() {
  console.log(arguments.length);
}
countArguments(...values);
countArguments(-1, ...values);

function getProduct(a, b, c = 1) {
  return a * b * c;
}

let getSum2 = (a, b, c = 0) => {
  return a + b + c;
}

console.log(getProduct(1, 2, 3));
console.log(getProduct(1, 2)); //

console.log(getSum2(1, 2, 1));
console.log(getSum2(...[0, 1]));

console.log('---');

function getSum3(...values) {
  // return values.reduce((x, y) => x + y, 0);
  return values.reduce((x, y) => x + y);
}
console.log(getSum3(1, 2, 3));

function ignoreFirst(firstValue, ...values) {
  console.log(values);
}

ignoreFirst(); // []
ignoreFirst(1); // []
ignoreFirst(1, 2); // [ 2 ]
ignoreFirst(1, 2, 3); // [ 2, 3 ]

let getSum4 = (...values) => {
  return values.reduce((x, y) =>x + y, 0);
}
console.log(getSum4(1, 2, 3)); // 6

console.log('===');

function callSomeFunction(someFunction, someArgument) {
  return someFunction(someArgument);
}

function add10(num) {
  return num + 10;
}

let result1 = callSomeFunction(add10, 10);
console.log(result1); // 20

function getGreeting(name) {
  return 'Hello, ' + name;
}

let result2 = callSomeFunction(getGreeting, 'Nicholas');
console.log(result2); // Hello, Nicholas

function createComparisonFunction(propertyName) {
  return function(object1, object2) {
    let value1 = object1[propertyName];
    let value2 = object2[propertyName];

    if (value1 < value2) {
      return -1;
    } else if (value1 > value2) {
      return 1;
    } else {
      return 0;
    }
  };
}

let data = [
  { name: 'Zachary', age: 28 },
  { name: 'Nicholas', age: 29 }
];
data.sort(createComparisonFunction('name', 'age'));
console.log(data[0].name); // Nicholas
data.sort(createComparisonFunction('age'));
console.log(data[0].name); // Zachary

function factorial(num) {
  if (num <= 1) {
    return 1;
  } else {
    return num * factorial(num - 1);
  }
}

function factorial2(num) {
  if (num <= 1) {
    return 1;
  } else {
    return num * arguments.callee(num - 1);
  }
}

let trueFactorial = factorial2;

factorial2 = function() {
  return 0;
};

console.log(trueFactorial(5)); // 120
console.log(factorial2(5)); // 0

console.log('---');

function King() {
  this.royaltyName = 'Henry';
  setTimeout(() => console.log(this.royaltyName), 1000);
}

function Queen() {
  this.royaltyName = 'Elizabeth';
  setTimeout(function() { console.log(this.royaltyName); }, 1000);
}

// new King(); // Henry
// new Queen(); // undefined

function outer() {
  inner();
}

function inner() {
  console.log(inner.caller);
}

outer();

function King() {
  if (!new.target) {
    throw 'King must be instantiated using "new"'
  }
  console.log('King instantiated using "new"');
}

new King(); // King instantiated using "new"
// King(); // Error: King must be instantiated using "new"

function sum(num1, num2) {
  return num1 + num2;
}

function callSum1(num1, num2) {
  return sum.apply(this, arguments);
}

function callSum2(num1, num2) {
  return sum.apply(this, [num1, num2]);
}

console.log(callSum1(10, 10));
console.log(callSum2(10, 10));

function sum3(num1, num2) {
  return num1 + num2;
}

function callSum3(num1, num2) {
  return sum3.call(this, num1, num2);
}

console.log(callSum3(10, 10));

var color = 'red';
var o = {
  color: 'blue'
};
function sayColor() {
  console.log(this.color);
}
let objectSayColor = sayColor.bind(o);
objectSayColor(); // blue

