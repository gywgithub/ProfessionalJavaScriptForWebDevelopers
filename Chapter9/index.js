const target = {
  // id: 'target',
  foo: 'bar',
  baz: 'qux'
};

const handler = {
  // get() {
  //   return 'handler override';
  // }

  // get(trapTarget, property, receiver) {
  //   // console.log(trapTarget === target);
  //   // console.log(property);
  //   // console.log(receiver === proxy);

  //   return trapTarget[property];
  // }

  // get() {
  //   return Reflect.get(...arguments);
  // }

  // get: Reflect.get
 
  get(trapTarget, property, receiver) {
    let decoration = '';
    if (property === 'foo') {
      decoration = '!!!';
    }
    return Reflect.get(...arguments) + decoration;
  }
};

const proxy = new Proxy(target, handler);
// const proxy = new Proxy(target, Reflect);

console.log(proxy.foo);
console.log(target.foo);

console.log(proxy.baz);
console.log(target.baz);

// proxy.foo;
// // true
// // foo
// // true

// console.log(target.foo);
// console.log(proxy.foo);

// console.log(target['foo']);
// console.log(proxy['foo']);

// console.log(Object.create(target)['foo']);
// console.log(Object.create(proxy)['foo']);


// console.log(target.id); // target
// console.log(proxy.id); // target

// target.id = 'foo';
// console.log(target.id); // foo
// console.log(proxy.id); // foo

// proxy.id = 'bar';
// console.log(target.id); // bar
// console.log(proxy.id); // bar

// console.log(target.hasOwnProperty('id')); // true
// console.log(proxy.hasOwnProperty('id')); // true

// // console.log(target instanceof Proxy); // TypeError: Function has non-object prototype 'undefined' in instanceof check
// // console.log(proxy instanceof Proxy); // TypeError: Function has non-object prototype 'undefined' in instanceof check

// console.log(target === proxy); // false


