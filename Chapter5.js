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

