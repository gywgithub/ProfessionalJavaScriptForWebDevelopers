// for (let i = 1; i <= 10; ++i) {
//   console.log(i);
// }

// let num = 1;
// let obj = {};
 
// console.log(num[Symbol.iterator]); // undefined
// console.log(obj[Symbol.iterator]); // undefined

// let str = 'abc'
// let arr = ['a', 'b', 'c'];
// let map = new Map().set('a', 1).set('b', 2).set('c', 3);
// console.log('map');
// console.log(map); // Map { 'a' => 1, 'b' => 2, 'c' => 3 }

// let set = new Set().add('a').add('b').add('c');
// console.log('set');
// console.log(set); // Set { 'a', 'b', 'c' }

// console.log(str[Symbol.iterator]); // [Function: [Symbol.iterator]]
// console.log(arr[Symbol.iterator]);
// console.log(map[Symbol.iterator]);
// console.log(set[Symbol.iterator]);

// console.log(str[Symbol.iterator]()); // Object [String Iterator] {}
// console.log(arr[Symbol.iterator]()); // Object [Array Iterator] {}
// console.log(map[Symbol.iterator]()); // [Map Iterator] { [ 'a', 1 ], [ 'b', 2 ], [ 'c', 3 ] }
// console.log(set[Symbol.iterator]()); // [Set Iterator] { 'a', 'b', 'c' }


console.log('---')

// let arr = ['foo', 'bar', 'baz'];
// for (let el of arr) {
//   console.log(el);
// }
// // foo
// // bar
// // baz

// let [a, b, c] = arr;
// console.log(a, b, c);
// // foo bar baz

// let arr2 = [...arr];
// console.log(arr2);
// // [ 'foo', 'bar', 'baz' ]

// let arr3 = Array.from(arr);
// console.log(arr3);
// // [ 'foo', 'bar', 'baz' ]

// let set = new Set(arr);
// console.log(set);
// // Set { 'foo', 'bar', 'baz' }

// let pairs = arr.map((x, i) => [x, i]);
// console.log(pairs);
// // [ [ 'foo', 0 ], [ 'bar', 1 ], [ 'baz', 2 ] ]
// let map = new Map(pairs);
// console.log(map);
// // Map { 'foo' => 0, 'bar' => 1, 'baz' => 2 }

// class FooArray extends Array {}
// let fooArr = new FooArray('foo', 'bar', 'baz');
// for (let el of fooArr) {
//   console.log(el);
// }
// // foo
// // bar
// // baz

// console.log('===')

// let arr = ['foo', 'bar'];
// console.log(arr[Symbol.iterator]); // [Function: values]
// let iter = arr[Symbol.iterator]();
// console.log(iter); // Object [Array Iterator] {}

// console.log(iter.next()); // { value: 'foo', done: false }
// console.log(iter.next()); // { value: 'bar', done: false }
// console.log(iter.next()); // { value: undefined, done: true }

// let iter1 = arr[Symbol.iterator]();
// let iter2 = arr[Symbol.iterator]();

// console.log(iter1.next()); // { value: 'foo', done: false }
// console.log(iter2.next()); // { value: 'foo', done: false }
// console.log(iter2.next()); // { value: 'bar', done: false }
// console.log(iter1.next()); // { value: 'bar', done: false }
// console.log(iter1.next()); // { value: undefined, done: true }
// console.log(iter2.next()); // { value: undefined, done: true }


// console.log('---');

// class Foo {
//   [Symbol.iterator]() {
//     return {
//       next() {
//         return {done: false, value: 'foo'};
//       }
//     }
//   }
// }

// let f = new Foo();
// console.log(f[Symbol.iterator]()); // { next: [Function: next] }

// let a = new Array();
// console.log(a[Symbol.iterator]()); // Object [Array Iterator] {}

// class Counter {
//   constructor(limit) {
//     this.count = 1;
//     this.limit = limit;
//   }

//   next() {
//     if (this.count <= this.limit) {
//       return { done: false, value: this.count++ };
//     } else {
//       return { done: true, value: undefined };
//     }
//   }
//   [Symbol.iterator]() {
//     return this;
//   }
// }

// let counter = new Counter(3);
// for (let i of counter) {
//   console.log(i);
// }
// // 1
// // 2
// // 3

// for (let i of counter) { console.log(i); } // (nothing logged) 

// class Counter2 {
//   constructor(limit) {
//     this.limit = limit;
//   }

//   [Symbol.iterator]() {
//     let count = 1,
//         limit = this.limit;
//     return {
//       next() {
//         if (count <= limit) {
//           return { done: false, value: count++ };
//         } else {
//           return { done: true, value: undefined };
//         }
//       },
//       return() {
//         console.log('Exiting early');
//         return { done: true };
//       }
//     };
//   }
// }

// let counter11 = new Counter2(5);
// for (let i of counter11) {
//   if (i > 2) {
//     break;
//   }
//   console.log(i);
// }
// // 1
// // 2
// // Exiting early

// let counter12 = new Counter2(5);
// try {
//   for (let i of counter12) {
//     if (i > 2) {
//       throw 'err';
//     }
//     console.log(i);
//   }
// } catch(e) {}
// // 1
// // 2
// // Exiting early

// let counter13 = new Counter2(5);
// let [a, b] = counter13;
// // Exiting early
// console.log(a);
// console.log(b);
// // 1
// // 2

// let counter2 = new Counter2(3);
// for (let i of counter2) { console.log(i); }

// for (let i of counter2) { console.log(i); }

// let arr = ['foo', 'bar', 'baz'];
// let iter1 = arr[Symbol.iterator]();

// console.log(iter1[Symbol.iterator]); // [Function: [Symbol.iterator]]

// let iter2 = iter1[Symbol.iterator]();
// console.log(iter1 === iter2); // true

// let arr4 = [3, 1, 4];
// let iter4 = arr4[Symbol.iterator]();
// for (let item of arr4) { console.log(item); }
// // 3
// // 1
// // 4
// for (let item of iter4) { console.log(item); }
// // 3
// // 1
// // 4


let a = [1, 2, 3, 4, 5];
let iter = a[Symbol.iterator]();
// for (let i of iter) {
//   console.log(i);
//   if (i > 2) {
//     break;
//   }
// }
// // 1
// // 2
// // 3
// for (let i of iter) {
//   console.log(i);
// }
// // 4
// // 5

iter.return = function() {
  console.log('Exiting eary');
  return { done: true };
}

for (let i of iter) {
  console.log(i);
  if (i > 2) {
    break;
  }
}
// 1
// 2
// 3
// Exiting eary

for (let i of iter) {
  console.log(i);
}
// 4
// 5