const ws = new WeakSet();

const val1 = {id: 1},
      val2 = {id: 2},
      val3 = {id: 3};

const ws1 = new WeakSet([val1, val2, val3]);
console.log(ws1.has(val1)); // true
console.log(ws1.has(val2)); // ture
console.log(ws1); // WeakSet { <items unknown> }

// const ws2 = new WeakSet([val1, 'BADVAL', val3]);
// console.log(ws2);  //TypeError: Invalid value used in weak set

const stringVal = new String('val1');
const ws3 = new WeakSet([stringVal]);
console.log(ws3.has(stringVal)); // true

const ws4 = new WeakSet();
const val41 = {id: 1},
      val42 = {id: 2};
console.log(ws4.has(val41)); // false
ws4.add(val41).add(val42);

console.log(ws4.has(val41)); // true

console.log('---');
ws4.delete(val41);
console.log(ws4.has(val41)); // false
console.log(ws4.has(val42)); // true

const disabledElements = new Set();
const loginButton = document.querySelector('#login');
disabledElements.add(loginButton);