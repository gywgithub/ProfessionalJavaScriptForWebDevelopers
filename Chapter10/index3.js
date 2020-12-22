function createCompairsonFunction(propertyName) {
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


// function factorial(num) {
//   if (num <= 1) {
//     return 1;
//   } else {
//     // return num * factorial(num - 1);
//     return num * arguments.callee(num - 1);
//   }
// }

const factorial = (function f(num) {
  if (num <= 1) {
    return 1;
  } else {
    return num * f(num - 1);
  }
});

let anotherFactorial = factorial;
console.log(factorial(5)); // 120
// factorial = null;
// console.log(anotherFactorial(5)); // TypeError: factorial is not a function

