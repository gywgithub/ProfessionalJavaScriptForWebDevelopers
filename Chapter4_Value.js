let person = new Object();
person.name = 'Nicholas';
console.log(person.name);

let name1 = 'Nicholas';
let name2 = new String('Matt');
name1.age = 27;
name2.age = 26;
console.log(name1.age); // undefined
console.log(name2.age); // 26
console.log(typeof name1); // string
console.log(typeof name2); // object

let num1 = 5;
let num2 = num1;

function addTen(num) {
  num += 10;
  return num;
}

let count = 20;
let result = addTen(count);
console.log(count); // 20
console.log(result); // 30


function setName(obj) {
  obj.name = 'Nicholas';
}

let person2 = new Object();
setName(person2);
console.log(person2.name);

function setName2(obj) {
  obj.name = 'Nicholas';
  obj = new Object();
  obj.name = 'Greg';
}
let person3 = new Object();
setName2(person3);
console.log(person3.name); // Nicholas

let s = 'Nicholas';
let b = true;
let i = 22;
let u;
let n = null;
let o = new Object();
console.log(typeof s); // string
console.log(typeof i); // number
console.log(typeof b); // boolean
console.log(typeof u); // undefined
console.log(typeof n); // object
console.log(typeof o); // object

console.log(o instanceof Object); // true
let arr = [1, 2];
console.log(arr instanceof Array); // true
