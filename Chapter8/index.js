// let person = new Object();
// person.name = 'Nicholas';
// person.age = 29;
// person.job = 'Software Engineer';
// person.sayName = function() {
//   console.log(this.name);
// };

// let person2 = {
//   name: 'Nicholas',
//   age: 29,
//   job: 'Software Engineer',
//   sayName() {
//     console.log(this.name);
//   }
// };

// let person3 = {};
// Object.defineProperty(person3, 'name', {
//   writable: false,
//   value: 'Nicholas'
// });
// console.log(person3.name); // Nicholas
// person3.name = 'Greg';
// console.log(person3.name); // Nicholas

// let person4 = {};
// Object.defineProperty(person4, 'name', {
//   configurable: false,
//   value: 'Nicholas'
// });
// console.log(person4.name); // Nicholas
// delete person4.name;
// console.log(person4.name); // Nicholas

// let person5 = {};
// Object.defineProperty(person5, 'name', {
//   configurable: false,
//   value: 'Nicholas'  
// });
// // Object.defineProperty(person5, 'name', {
// //   configurable: true,
// //   value: 'Nicholas'
// // });

// let book = {
//   year_: 2017,
//   edition: 1
// };
// Object.defineProperty(book, 'year', {
//   get() {
//     return this.year_;
//   },
//   set(newValue) {
//     if (newValue > 2017) {
//       this.year_ = newValue;
//       this.edition += newValue - 2017;
//     }
//   }
// });
// book.year = 2018;
// console.log(book.edition); // 2



// let book2 = {};
// Object.defineProperties(book2, {
//   year_: {
//     value: 2017
//   },
//   edition: {
//     value: 1
//   },
//   year: {
//     get() {
//       return this.year_;
//     },
//     set(newValue) {
//       if (newValue > 2017) {
//         this.year_ = newValue;
//         this.edition += newValue - 2017;
//       }
//     }
//   }
// });

// let descriptor2 = Object.getOwnPropertyDescriptor(book2, 'year_');
// console.log(descriptor2.value); // 2017
// console.log(descriptor2.configurable); // false
// console.log(typeof descriptor2.get); // 'undefined'

// let descriptor3 = Object.getOwnPropertyDescriptor(book2, 'year');
// console.log(descriptor3.value); // undefined
// console.log(descriptor3.enumerable); // false
// console.log(typeof descriptor3.get); // 'function'

// console.log(Object.getOwnPropertyDescriptors(book2));
// // { year_:
// //   { value: 2017,
// //     writable: false,
// //     enumerable: false,
// //     configurable: false },
// //  edition:
// //   { value: 1,
// //     writable: false,
// //     enumerable: false,
// //     configurable: false },
// //  year:
// //   { get: [Function: get],
// //     set: [Function: set],
// //     enumerable: false,
// //     configurable: false } }

// let dest, src, result;
// dest = {};
// src = { id: 'src' };

// result = Object.assign(dest, src);
// console.log(dest === result); // true
// console.log( dest !== src); // true
// console.log(result); // { id: 'src' }
// console.log(src); // { id: 'src' }

// dest = {};
// result = Object.assign(dest, { a: 'foo' }, { b: 'bar' });
// console.log(result); // { a: 'foo', b: 'bar' }

// dest = {
//   set a(val) {
//     console.log(`Invoked dest setter with param ${val}`);
//   }
// };

// src = {
//   get a() {
//     console.log('Invoked src getter');
//     return 'foo';
//   }
// };

// Object.assign(dest, src);
// console.log(dest);
// // Invoked src getter
// // Invoked dest setter with param foo
// // { a: [Setter] }

// let name21 = 'Matt';
// let person21 = {
//   name21
// }
// console.log(person21);

// function makePerson21(name) {
//   return {
//     name
//   }
// }

// let person22 = makePerson21('Matt');
// console.log(person22.name);


// let person23 = {
//   name: 'Matt',
//   age: 27
// }
// let { name: personName, age: personAge } = person23;
// console.log(personName);
// console.log(personAge);

// let person24 = {
//   name: 'Matt',
//   age: 27
// }

// let { name, job } = person24;
// console.log(name); // Matt
// console.log(job); // undefined


// let person25 = {
//   name2: 'Matt',
//   age2: 27
// }

// let { name2, job2 = 'Software Engineer' } = person25;
// console.log(name2); // Matt
// console.log(job2); // Software Engineer


// let { length } = 'foobar';
// console.log(length); // 6

// let { constructor: c } = 4;
// console.log(c === Number); // true

// // let { _ } = null;
// // let { _ } = undefined;


// let personName2, personAge2;
// let person26 = {
//   name26: 'Matt',
//   age26: 27
// }
// console.log(person26); // { name26: 'Matt', age26: 27 }
// ({name26: personName2, age26:personAge2} = person26);
// console.log(personName2); // Matt
// console.log(personAge2); // 27

// let person27 = {
//   name27: 'Matt',
//   age27: 27,
//   job27: {
//     title: 'Software engineer'
//   }
// };
// let personCopy = {};
// ({
//   name27: personCopy.name27,
//   age27: personCopy.age27,
//   job27: personCopy.job27
// } = person27);

// person27.job27.title = 'Hacker';

// console.log(person27); // { name27: 'Matt', age27: 27, job27: { title: 'Hacker' } }
// console.log(personCopy); // { name27: 'Matt', age27: 27, job27: { title: 'Hacker' } }

// let person = {
//   name: 'Matt',
//   age: 27,
//   job: {
//     title: 'Software engineer'
//   }
// };
// let personCopy = {};
// ({
//   name: personCopy.name,
//   age: personCopy.age,
//   job: personCopy.job
// } = person); 
// // 因为一个对象的引用被赋值给personCopy，所以修改
// // person.job对象的属性也会影响personCopy 
// person.job.title = 'Hacker'
// console.log(person); 
// // { name: 'Matt', age: 27, job: { title: 'Hacker' } } 
// console.log(personCopy);
// // { name: 'Matt', age: 27, job: { title: 'Hacker' } } 


let person = {
  name: 'Matt',
  age: 27
}

function printPerson(foo, {name, age}, bar) {
  console.log(arguments);
  console.log(name, age);
}

function printPerson2(foo, {name: personName, age: personAge}, bar) {
  console.log(arguments);
  console.log(personName, personAge);
}

printPerson('1st', person, '2nd');
// [Arguments] { '0': '1st', '1': { name: 'Matt', age: 27 }, '2': '2nd' }
// Matt 27

printPerson2('1st', person, '2nd');
// [Arguments] { '0': '1st', '1': { name: 'Matt', age: 27 }, '2': '2nd' }
// Matt 27