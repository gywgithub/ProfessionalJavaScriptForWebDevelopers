let i = 20;
if (i > 25) {
  console.log('i > 25, i = ' + i);
} else {
  console.log('i < 25, i = ' + i);
}

let j = 40;
if (j > 25) {
  console.log('j > 25');
} else if (j < 0) {
  console.log('j < 0');
} else {
  console.log(j);
}

let k = 0;
do {
  k += 2;
} while (k < 10);
console.log(k);

let a = 0;
while (a < 10) {
  a += 2;
}
console.log('a: ', a);

let c = 10;
for (let i = 0; i < c; i++) {
  console.log(i);
}

let c2 = 10;
let i2 = 0;
while (i2 < c2) {
  console.log(i2);
  i2++;
}

let c3 = 10;
let i3 = 0;
for (; i3 < c3; ) {
  console.log(i3);
  i3++;
}

// for (;;) { // 无穷循环
//   console.log(Math.random());
// }

// 使用 for-in 循环显示了 BOM 对象 window 的所有属性
// for (const propName in window) {
//   console.log(propName);
// }

for (const el of [2, 4, 5, 6]) {
  console.log(el);
}

start: for (let i = 0; i < 10; i++) {
  console.log(i);
}

console.log('---');

let num = 0;
for (let i = 1; i < 10; i++) {
  if (i % 5 == 0) {
    break;
  }
  num++;
}

console.log(num);

let num2 = 0;
for (let i = 1; i < 10; i++) {
  if (i % 5 == 0) {
    continue;
  }
  num2++;
}
console.log(num2);

console.log('===');

let num3 = 0;
outermost:
for (let i = 0; i < 10; i++) {
  for (let j = 0; j < 10; j++) {
    if (i == 5 && j == 5) {
      break outermost;
    }
    num3++;
  }
}

console.log(num3);

console.log('+++');

let num4 = 0;

outermost:
for (let i = 0; i < 10; i++) {
  for (let j = 0; j < 10; j++) {
    if (i == 5 && j == 5) {
      continue outermost;
    }
    num4++;
  }
}

console.log(num4);

switch ('hello world') {
  case 'hello' + ' world':
    console.log('Greeting was found.');
    break;
  case 'goodbye':
    console.log('Closing was found.');
    break;
  default:
    console.log('Unexpected message was found.');
}

let num5 = 25;
switch (true) {
  case num5 < 0:
    console.log('Less than 0.');
    break;
  case num5 >= 0 && num5 <= 10:
    console.log('Between 0 and 10.');
    break;
  case num5 > 10 && num5 <= 20:
    console.log('Between 10 and 20.');
    break;
  default:
    console.log('More than 20.');
}

console.log('!!!');

function sayHi(name, message) {
  console.log('Hello ' + name + ', ' + message);
}

sayHi('Nicholas', 'how are you today?')

function sum(num1, num2) {
  return num1 + num2;
}

let res01 = sum(1, 2);
console.log(res01);
