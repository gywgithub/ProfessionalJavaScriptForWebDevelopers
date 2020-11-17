let person = new Object();
person.name = 'Nicholas';
person.age = 29;

console.log(person);

let person2 = {
  name: 'Nicholas',
  age: 28
};

console.log(person2);

let person3 = {};
person3.name = 'Nicholas';
person3.age = 28;

function displayInfo(args) {
  let output = '';

  if (typeof args.name == 'string') {
    output += 'Name: ' + args.name + '\n';
  }

  if (typeof args.age == 'number') {
    output += 'Age: ' + args.age + '\n';
  }

  // alert(output);
  console.log(output);
}

displayInfo({
  name: 'Nicholas',
  age: 29
});

displayInfo({
  name: 'Greg'
});