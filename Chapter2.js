let name = 'Nicholas';
// let age = 36;

if (typeof name === 'undefined') {
  let name;
}

name = 'Matt';

try {
  console.log(age);
} catch (err) {
  let age;
}

age = 25;
console.log(age);

for (var i = 0; i < 5; i++) {
  console.log('i:  ' + i);
}

console.log(i);