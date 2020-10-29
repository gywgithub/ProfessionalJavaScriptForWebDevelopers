let someDate = new Date(Date.parse('May 23, 2019'));
console.log(someDate);

let y2k = new Date(Date.UTC(2000, 0));
console.log(y2k);

let allFives = new Date(Date.UTC(2005, 4, 5, 17, 55, 55));
console.log(allFives);

let start = Date.now();

let stop = Date.now();
console.log(stop);
console.log(stop - start);

let date1 = new Date(2019, 0, 1);
let date2 = new Date(2019, 1, 1);
console.log(date1 < date2); // true

let pattern1 = /at/g;
console.log(pattern1);

let pattern2 = /[bc]at/i;

let pattern3 = /.at/gi;

let pattern5 = /\[bc\]at/i;

let pattern6 = /\.at/gi;

let pattern7 = new RegExp('[bc]at', 'i');

let text = 'mom and dad and baby';
let pattern8 = /mom( and dad( and baby)?)?/gi;
let matches = pattern8.exec(text);
console.log(matches.index);
console.log(matches.input);
console.log(matches[0]);
console.log(matches[1]);
console.log(matches[2]);

let text2 = 'cat, bat, sat, fat';
let pattern9 = /.at/;
let matches2 = pattern9.exec(text2);
console.log(matches2);
console.log(matches2.index);
console.log(matches2.input);
console.log(matches2[0]);
console.log(pattern8.lastIndex);

matches2 = pattern9.exec(text2);
console.log(matches2.index);
console.log(matches2[0]);
console.log(pattern9.lastIndex);

let text3 = '000-00-0000';
let pattern10 = /\d{3}-\d{2}-\d{4}/;
if (pattern10.test(text3)) {
  console.log('The pattern was matched.');
}

let pattern11 = new RegExp('\\[bc\\]at', 'gi');
console.log(pattern11);
console.log(pattern11.toString());
console.log(pattern11.toLocaleString());

let text4 = 'this has been a short summer';
let pattern12 = /(.)hort/g;
if (pattern12.test(text4)) {
  // 注意，以下代码需要在Chrome中执行
  console.log(RegExp.input);
  console.log(RegExp.leftContext);
  console.log(RegExp.rightContext);
  console.log(RegExp.lastMatch);
  console.log(RegExp.lastParen);
}

let s1 = 'some text';
let s2 = s1.substring(2);
console.log(s1);
console.log(s2);

let obj = new Object('some text');
console.log(obj instanceof String); // true

let value2 = '25';
let number2 = Number(value2);
console.log(number2); // 25
console.log(typeof number2); // number
let obj2 = new Number(value2);
console.log(typeof obj2); // object

let booleanObject = new Boolean(true);
console.log(booleanObject);

let num = 10;
console.log(num); // 10
console.log(num.toString()); // 10
console.log(num.toString(2)); // 1010
console.log(num.toString(8)); // 12
console.log(num.toString(10)); // 10

// 科学计数法，指数计数法
console.log(num.toExponential(1)); // 1.0e+1

console.log(num.toFixed(2)); // 10.00
let num2 = 10.005;
console.log(num2.toFixed(2)); // 10.01

console.log('---');

let num3 = 99;
console.log(num3.toPrecision(1)); // 1e+2
console.log(num3.toPrecision(2)); // 99
console.log(num3.toPrecision(3)); // 99.0

let numberObject = new Number(10);
let numberValue = 10;
console.log(typeof numberObject); // object
console.log(typeof numberValue); // number
console.log(numberObject instanceof Number); // true
console.log(numberValue instanceof Number); // false

// Number.isInteger() 用于辨别一个数值是否保存为整数
console.log(Number.isInteger(1)); // true
console.log(Number.isInteger(1.00)); // true
console.log(Number.isInteger(1.01)); // false

console.log('===');

console.log(Number.isSafeInteger(2 ** 53)); // false
console.log(Number.isSafeInteger((2 ** 53) - 1)); // true

let stringObject = new String('hello world');
console.log(stringObject);

let stringValue = 'hello world';
console.log(stringValue.length); // 11

let message = 'abcde';
console.log(message.charAt(2)); // c
console.log(message.charCodeAt(2)); // 99

console.log(99 === 0x63); // true
console.log(String.fromCharCode(0x61, 0x62, 0x63, 0x64, 0x65)); // abcde
console.log(String.fromCharCode(97, 98, 99, 100, 101)); // abcde

// codePointAt() 方法可以从指定码元位置识别完整的码点
let message2 = 'ab☺de';
console.log(message2.codePointAt(1)); // 98
console.log(message2.codePointAt(2)); // 128522
console.log(message2.codePointAt(3)); // 56842
console.log(message2.codePointAt(4)); // 100

console.log([...'ab☺de']); // [ 'a', 'b', '☺', 'd', 'e' ]

let stringValue2 = 'hello ';
let result2 = stringValue2.concat('world');
console.log(result2); // hello world
console.log(stringValue2); // hello

let stringValue3 = 'hello ';
let result3 = stringValue3.concat('world', '!');
console.log(result3); // hello world!
console.log(stringValue3); // hello

let stringValue4 = 'hello world';
console.log(stringValue4.slice(3)); // lo world
console.log(stringValue4.substring(3)); // lo world
console.log(stringValue4.substr(3)); // lo world
console.log(stringValue4.slice(3, 7)); // lo w
console.log(stringValue4.substring(3, 7)); // lo w
console.log(stringValue4.substr(3, 7)); // lo worl

console.log(stringValue4.indexOf('o')); // 4
console.log(stringValue4.lastIndexOf('o')); // 7

console.log(stringValue4.indexOf('o', 6)); // 7
console.log(stringValue4.lastIndexOf('o', 6)); // 4

let stringValue5 = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit';
let positions = new Array();
let pos = stringValue5.indexOf('e');

while(pos > -1) {
  positions.push(pos);
  pos = stringValue5.indexOf('e', pos + 1);
}
console.log(positions); // [3, 24, 32, 35, 52]

console.log('!!!');

let message3 = 'foobarbaz';

console.log(message3.startsWith('foo')); // true
console.log(message3.startsWith('bar')); // false

console.log(message3.endsWith('baz')); // true
console.log(message3.endsWith('bar')); // false

console.log(message3.includes('bar')); // true
console.log(message3.includes('qux')); // false

console.log(message3.startsWith('foo', 1)); // false
console.log(message3.includes('bar', 4)); // false
console.log(message3.includes('bar', 2)); // true
console.log(message3.endsWith('baz', 1)); // false