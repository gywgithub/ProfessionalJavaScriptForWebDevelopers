const user = { name: 'Jake' };

const proxy = new Proxy(user, {
  get(target, property, receiver) {
    console.log(`Getting ${property}`);
    return Reflect.get(...arguments);
  },
  set(target, property, value, receiver) {
    console.log(`Setting ${property}=${value}`);
    return Reflect.set(...arguments);
  }
});

proxy.name; // Getting name
proxy.age = 27; // Setting age=27

console.log('---');

const hiddenProperties = ['foo', 'bar'];
const targetObject = {
  foo: 1,
  bar: 2,
  baz: 3
};
const proxy2 = new Proxy(targetObject, {
  get(target, property) {
    if (hiddenProperties.includes(property)) {
      return undefined;
    } else {
      return Reflect.get(...arguments);
    }
  },
  has(target, property) {
    if (hiddenProperties.includes(property)) {
      return false;
    } else {
      return Reflect.has(...arguments);
    }
  }
});

// get()
console.log(proxy2.foo); // undefined
console.log(proxy2.bar); // undefined
console.log(proxy2.baz); // 3

// has()
console.log('foo' in proxy2); // false
console.log('bar' in proxy2); // false
console.log('baz' in proxy2); // true

console.log('===');

const target3 = {
  onlyNumbersGoHere: 0
};
const proxy3 = new Proxy(target3, {
  set(target, property, value) {
    if (typeof value !== 'number') {
      return false;
    } else {
      return Reflect.set(...arguments);
    }
  }
});

proxy3.onlyNumbersGoHere = 1;
console.log(proxy3.onlyNumbersGoHere); // 1
proxy3.onlyNumbersGoHere = '2';
console.log(proxy3.onlyNumbersGoHere); // 1

console.log('---');

function median(...nums) {
  return nums.sort()[Math.floor(nums.length / 2)];
}

const proxy4 = new Proxy(median, {
  apply(target, thisArg, argumentsList) {
    for (const arg of argumentsList) {
      if (typeof arg !== 'number') {
        throw 'Non-number argument provided';
      }
    }
    return Reflect.apply(...arguments);
  }
});

console.log(proxy4(4, 7, 1)); // 4
// console.log(proxy4(4, '7', 1)); // throw 'Non-number argument provided';

console.log('===');

class User {
  constructor(id) {
    this._id = id;
  }
}

const proxy5 = new Proxy(User, {
  construct(target, argumentsList, newTarget) {
    if (argumentsList[0] === undefined) {
      throw 'User connot be instantiated without id';
    } else {
      return Reflect.construct(...arguments);
    }
  }
});

new proxy5(1);
// new proxy5(); // throw 'User connot be instantiated without id';

console.log('---');

const userList6 = [];
class User6 {
  constructor(name) {
    this.name_ = name;
  }
}

const proxy6 = new Proxy(User6, {
  construct() {
    const newUser6 = Reflect.construct(...arguments);
    userList6.push(newUser6);
    return newUser6;
  }
});

new proxy6('John');
new proxy6('Jacob');
new proxy6('Jingleheimerschmidt');

console.log(userList6);
// [ User6 { name_: 'John' },
//   User6 { name_: 'Jacob' },
//   User6 { name_: 'Jingleheimerschmidt' } ]

console.log('===');

const userList7 = [];
function emit7(newValue) {
  console.log(newValue);
}

const proxy7 = new Proxy(userList7, {
  set(target, property, value, receiver) {
    const result7 = Reflect.set(...arguments);
    if (result7) {
      emit7(Reflect.get(target, property, receiver));
    }
    return result7;
  }
});

proxy7.push('John'); // John
proxy7.push('Jacob'); // Jacob

