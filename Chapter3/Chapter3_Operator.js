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

let num11 = 25;
let num21 = ~num11;
console.log(num21); // -26

let num12 = 25;
let num22 = -num12 - 1;
console.log(num22); // -26

let num13 = -25;
let num23 = ~num13;
console.log(num23); // 24

let result = 25 & 3;
console.log(Number(25).toString(2)); // 二进制数值：11001
console.log(Number(3).toString(2)); // 二进制数值： 11
console.log(result); // 1

let result2 = 25 | 3;
console.log(Number(25).toString(2)); // 二进制:11001
console.log(Number(3).toString(2)); // 二进制：11
console.log(result2); // 十进制： 27

let result3 = 25 ^ 3;
console.log(result3); // 26

let oldValue = 2;
let newValue = oldValue << 5;
console.log(oldValue); // 2
console.log(newValue); // 64

console.log('---');

let oldValue2 = 64;
let newValue2 = oldValue2 >> 5;
console.log(oldValue2); // 64
console.log(newValue2); // 2

console.log('###');

let oldValue3 = 2;
let newValue3 = oldValue3 >> 5;
console.log(oldValue3); // 2
console.log(newValue3); // 0

console.log('$$$');

let oldValue4 = 64;
let newValue4 = oldValue4 >>> 5;
console.log(newValue4); // 2

let oldValue5 = -64;
let newValue5 = oldValue5 >>> 5;
console.log(newValue5); // 134327726

console.log('%%%');

console.log(!false); // true
console.log(!'blue'); // false
console.log(!0); // true
console.log(!NaN); // true
console.log(!''); // true
console.log(!12345); // false

console.log('^^^');

console.log(!!'blue'); // true
console.log(!!0); // false
console.log(!!NaN); // false
console.log(!!''); // false
console.log(!!123); // true
console.log(Boolean(124));
if (123) {
  console.log(1);
}

let found = true;
// let result5 = (found && someUndeclaredVariable); // ReferenceError: someUndeclaredVariable is not defined.    // 短路特性
// console.log(result5);

let found2 = false;
let result6 = (found2 && someUndeclaredVariable);
console.log(result6); // false

let found3 = false;
// let result7 = (found3 || someUndeclaredVariable); // ReferenceError: someUndeclaredVariable is not defined.      // 短路特性
// console.log(result7);

let found4 = true;
let result8 = (found4 || someUndeclaredVariable);
console.log(result8); // true

let preferredObject = null;
let backupObject = 'abc';
let myObject = preferredObject || backupObject;
console.log(myObject); 

console.log('---');

let result9 = 34 * 56;

let result10 = 66 / 11;

// 取模（余数）操作符由一个百分比符号（%）表示
let result11 = 26 % 5;
console.log(result11); // 1

console.log(Math.pow(3, 2)); // 9
console.log(3 ** 2); // 9

console.log(Math.pow(16, 0.5)); // 4
console.log(16** 0.5); // 4

let squared = 3;
squared **= 2;
console.log(squared); // 9

let sqrt = 16;
sqrt **= 0.5;
console.log(sqrt); // 4

console.log('===');

let result12 = 1 + 2;
console.log(result12); // 3

let result13 = 5 + 5;
console.log(result13);

let result14 = 5 + '5';
console.log(result14);

let num14 = 5;
let num24 = 10;
let message = 'The sum of 5 and 10 is ' + num14 + num24;
console.log(message);
let message2 = 'The sum of 5 and 10 is ' + (num14 + num24);
console.log(message2);

let result15 = 2 - 1;
let result16 = 5 - true;
let result17 = NaN - 1;
let result18 = 5 - 3;
let result19 = 5 - '';
let result20 = 5 - '2';
let result21 = 5 - null;
console.log(result16); // 4
console.log(result17); // NaN
console.log(result18); // 2
console.log(result19); // 5
console.log(result20); // 3
console.log(result21); // 5

console.log(5 > 3); // true
console.log(5 < 3); // false
console.log('Brick' < 'alphabet'); // true
console.log('Brick'.toLowerCase() < 'alphabet'.toLowerCase()); // false
console.log('23' < '3'); // true
console.log('23' < 3); // false
console.log('a' < 3); // false
console.log(NaN < 3); // false
console.log(NaN >= 3); // false

console.log('=+=');

let result22 = 4 > 3 ? 'a' : 'b';
console.log(result22); // a

let n1 = 1, n2 = 2, sn = 's';
console.log(n1, n2, sn);