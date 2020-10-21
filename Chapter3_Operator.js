let age = 29;
console.log(++age); // 30

let age2 = 29;
console.log(age2++); // 29

let a = 1;
console.log(a+1); // 2

let ba = 29;
let c = --ba + 2;
console.log(ba); // 28
console.log(c); // 30

let num1 = 2;
let num2 = 20;
// let num3 = --num1 + num2;
let num3 = num1-- + num2;
let num4 = num1 + num2;
// console.log(num3); // 21
console.log(num3); // 22
console.log(num4); // 21 

console.log('-----');

// let s1 = '2';
// let s2 = 'z';
// let b1 = false;
// let f1 = 1.1;
// let o1 = {
//   valueOf() {
//     return -1;
//   }
// }

// console.log(s1++); // 2
// console.log(s2++); // NaN
// console.log(b1++); // 0
// console.log(f1--); // 1.1
// console.log(o1--); // -1

console.log('*****');

let s1 = '01';
let s2 = '1.1';
let s3 = 'z';
let b = false;
let f = 1.1;
let o = {
  valueOf() {
    return -1;
  }
}

s1 = +s1;
s2 = +s2;
s3 = +s3;
b = +b;
f = +f;
o = +o;
console.log(s1); // 1
console.log(s2); // 1.1
console.log(s3); // NaN
console.log(b); // 0
console.log(f); // 1.1
console.log(o); // -1

s1 = -s1;
console.log(s1); // -1