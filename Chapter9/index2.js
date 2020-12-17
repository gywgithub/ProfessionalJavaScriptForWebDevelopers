const target = {
  foo: 'bar'
};

const handler = {
  get() {
    return 'intercepted';
  }
};

const { proxy, revoke } = Proxy.revocable(target, handler);

console.log(proxy.foo);
console.log(target.foo);

revoke();

// console.log(proxy.foo);


const o = {};

// try {
//   Object.defineProperty(o, 'foo', 'bar');
//   console.log('success');
// } catch(e) {
//   console.log('failure');
// }

try {
  Reflect.defineProperty(o, 'foo', 'bar');
  console.log('success');
} catch(e) {
  console.log('failure');
}

console.log('---');

const target2 = { foo: 'bar' };
const firstProxy = new Proxy(target2, {
  get () {
    console.log('first proxy');
    return Reflect.get(...arguments);
  }
});

const secondProxy = new Proxy(firstProxy, {
  get() {
    console.log('second proxy');
    return Reflect.get(...arguments);
  }
});

console.log(secondProxy.foo);
// second proxy
// first proxy
// bar


const myTarget3 = {};
const proxy3 = new Proxy(myTarget3, {
  get(target, property, receiver) {
    console.log('get()');
    return Reflect.get(...arguments);
  }
});
proxy3.foo;


const myTarget4 = {};
const proxy4 = new Proxy(myTarget4, {
  set(target, property, value, receiver) {
    console.log('set()');
    return Reflect.set(...arguments);
  }
});
proxy4.foo = 'bar';

console.log('===');

const myTarget5 = {};
const proxy5 = new Proxy(myTarget5, {
  has(target, property) {
    console.log('has()');
    return Reflect.has(...arguments);
  }
})
'foo' in proxy5;

const myTarget6 = {};

const proxy6 = new Proxy(myTarget6, {
  defineProperty(target, property, descriptor) {
    console.log('defineProperty()');
    return Reflect.defineProperty(...arguments);
  }
});
Object.defineProperty(proxy6, 'foo', {value: 'bar'});