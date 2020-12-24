// -------------- 闭包 -----------------

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
  }
}

function compare(value1, value2) {
  if (value1 < value2) {
    return -1;
  } else if (value1 > value2) {
    return 1;
  } else {
    return 0;
  }
}

let result = compare(5, 10);
console.log(result); // -1

let compare2 = createComparisonFunction('name');
let result2 = compare2({ name: 'Nicholas' }, { name: 'Matt' });
console.log(result2); // 1

compare2 = null;

// 因为闭包会保留它们包含函数的作用域，所以比其他函数更占用内存。
// 过度使用闭包可能导致内存过度占用，因此建议仅在十分必要时使用。
// V8等优化的JavaScript引擎会努力回收被闭包困住的内存，不过我们还是建议在使用闭包时要谨慎。
