const wm = new WeakMap();
const key1 = {id: 1},
      key2 = {id: 2},
      key3 = {id: 3};

const wm1 = new WeakMap([
  [key1, 'val1'],
  [key2, 'val2'],
  [key3, 'val3']
]);
console.log(wm1); // WeakMap { <items unknown> }
console.log(wm1.get(key1)); // val1
console.log(wm1.get(key2)); // val2
console.log(wm1.get(key3)); // val3

// const wm2 = new WeakMap([
//   [key1, 'val1'],
//   ['BADKEY', 'val2'],
//   [key3, 'val3']
// ]);
// TypeError: Invalid value used as weak map key
// typeof wm2;

const stringKey = new String('key1');
const wm3 = new WeakMap([
  [stringKey, 'val1']
]);
console.log(wm3.get(stringKey)); // val1

const wm4 = new WeakMap();
const key41 = {id: 1},
      key42 = {id: 2};
console.log(wm4.has(key41)); // false
console.log(wm4.get(key42)); // undefined

wm4.set(key41, 'Matt')
   .set(key42, 'Frisbie');
console.log(wm4.has(key41)); // true
console.log(wm4.get(key41)); // Matt
wm4.delete(key41);
console.log(wm4.has(key41)); // false
console.log(wm4.has(key42)); // true

const key51 = {id: 1},
      key52 = {id: 2},
      key53 = {id: 3};
const wm5 = new WeakMap().set(key51, 'val1');
wm5.set(key52, 'val2').set(key53, 'val3');
console.log(wm5.get(key51)); // val1
console.log(wm5.get(key52)); // val2
console.log(wm5.get(key53)); // val3

const wm6 = new WeakMap();
const container = {key: {}};
wm6.set(container.key, 'val');

function removeReference() {
  container.key = null;
}

const wm7 = new WeakMap();
class User {
  constructor(id) {
    this.idProperty = Symbol('id');
    this.setId(id);
  }

  setPrivate(property, value) {
    const privateMembers = wm7.get(this) || {};
    privateMembers[property] = value;
    wm7.set(this, privateMembers);
  }

  getPrivate(property) {
    return wm7.get(this)[property];
  }

  setId(id) {
    this.setPrivate(this.idProperty, id);
  }

  getId() {
    return this.getPrivate(this.idProperty);
  }
}

const user = new User(123);
console.log(user.getId()); // 123
user.setId(456);
console.log(user.getId()); // 456
console.log(wm7.get(user)[user.idProperty]); // 456

const wm8 = new WeakMap();
const loginButton = document.querySelector('#login');
wm8.set(loginButton, {disabled:true});