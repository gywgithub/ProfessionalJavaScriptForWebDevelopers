const m = new Set();

const s1 = new Set(['val1', 'val2', 'val3']);
console.log(s1.size); // 3
console.log(s1); // Set { 'val1', 'val2', 'val3' }
const s2 = new Set({
  [Symbol.iterator]: function*() {
    yield 'val1';
    yield 'val2';
    yield 'val3';
  }
});

console.log(s2); // Set { 'val1', 'val2', 'val3' }
console.log(s2.size); // 3

const s3 = new Set();
console.log(s3.has('Matt')); // false
console.log(s3.size); // 0

s3.add('Matt').add('Frisbie');
console.log(s3.has('Matt')); // true
console.log(s3.size); // 2

s3.delete('Matt');
console.log(s3.has('Matt')); // false
console.log(s3.has('Frisbie')); // true
console.log(s3.size); // 1

s3.clear();
console.log(s3.has('Matt')); // false
console.log(s3.has('Frisibie')); // false
console.log(s3.size); // 0

const s4 = new Set().add('val1');
s4.add('val2').add('val3');
console.log(s4.size); // 3
console.log(s4); // Set { 'val1', 'val2', 'val3' }

const s5 = new Set();
const functionVal = function() {};
const symbolVal = Symbol();
const objectVal = new Object();
s5.add(functionVal);
s5.add(symbolVal);
s5.add(objectVal);

console.log(s5.has(functionVal)); // true
console.log(s5.has(symbolVal)); // true
console.log(s5.has(objectVal)); // ture

console.log(s5.has(function() {})); // false

const s6 = new Set();
const objVal = {},
      arrVal = [];
s6.add(objVal);
s6.add(arrVal);
objVal.bar = 'bar';
arrVal.push('bar');
console.log(s6.has(objVal)); // true
console.log(s6.has(arrVal)); // true

const s7 = new Set();
s7.add('foo');
console.log(s7.size); // 1
s7.add('foo');
console.log(s7.size); // 1

console.log(s7.delete('foo')); // true
console.log(s7.delete('foo')); // false

const s8 = new Set(['val1', 'val2', 'val3']);
console.log(s8.values === s8[Symbol.iterator]); // true
console.log(s8.keys === s8[Symbol.iterator]); // true
console.log(s8.values); // [Function: values]
console.log(s8.keys); // [Function: values]
console.log(s8[Symbol.iterator]); // [Function: values]

for (let value of s8.values()) {
  console.log(value);
}
// val1
// val2
// val3

for (let value of s8[Symbol.iterator]()) {
  console.log(value);
}
// val1
// val2
// val3

console.log([...s8]); // [ 'val1', 'val2', 'val3' ]
console.log(...s8); // val1 val2 val3

const s9 = new Set(['val1', 'val2', 'val3']);
for (let pair of s9.entries()) {
  console.log(pair);
}
// [ 'val1', 'val1' ]
// [ 'val2', 'val2' ]
// [ 'val3', 'val3' ]

s9.forEach((val, dupVal) => console.log(`${val} -> ${dupVal}`));
// val1 -> val1
// val2 -> val2
// val3 -> val3

const s10 = new Set(['val1']);
for (let value of s10.values()) {
  value = 'newVal';
  console.log(value); // newVal
  console.log(s10.has('val1')); // true
}

const valObj = {id: 1};
const s11 = new Set([valObj]);
for (let value of s11.values()) {
  value.id = 'newVal';
  console.log(value); // { id: 'newVal' }
  console.log(s11.has(valObj)); // true
}
console.log(valObj); // { id: 'newVal' }

class XSet extends Set {
  union(...sets) {
    return XSet.union(this, ...sets);
  }

  intersection(...sets) {
    return XSet.intersection(this, ...sets);
  }

  difference(set) {
    return XSet.diffenrence(this, set);
  }

  symmetricDifference(set) {
    return XSet.symmertricDifference(this, set);
  }

  cartesianProduct(set) {
    return XSet.cartesianProduct(this, set);
  }

  powerSet() {
    return XSet.powerSet(this);
  }

  // 返回两个或更多集合的并集
  static union(a, ...bSets) {
    const unionSet = new XSet(a);
    for (const b of bSets) {
      for (const bValue of b) {
        unionSet.add(bValue);
      }
    }
    return unionSet;
  }

  // 返回两个或更多集合的交集
  static intersection(a, ...bSets) {
    const intersetctionSet = new XSet(a);
    for (const aValue of intersetctionSet) {
      for (const b of bSets) {
        if (!b.has(aValue)) {
          intersectionSet.delete(aValue);
        }
      }
    }
    return intersectionSet;
  }

  // 返回两个集合的差集
  static difference(a, b) {
    const differenceSet = new XSet(a);
    for (const bValue of b) {
      if (a.has(bValue)) {
        differenceSet.delete(bValue);
      }
    }
    return differenceSet;
  }

  // 返回两个集合的对称差集
  static symmetricDifference(a, b) {
    // 按照定义，对称差集可以表达为
    return a.union(b).difference(a.intersection(b));
  }

  // 返回两个集合（数组对形式）的笛卡尔积
  // 必须返回数组集合,因为笛卡尔积可能包含相同值的对
  static cartesianProduct(a, b) {
    const cartesianProductSet = new XSet();
    for (const aValue of a) {
      for (const bValue of b) {
        cartesianProductSet.add([aValue, bValue]);
      }
    }
    return cartesianProductSet;
  }

  // 返回一个集合的幂集
  static powerSet(a) {
    const powerSet = new XSet().add(new XSet());
    for (const aValue of a) {
      for (const set of new XSet(powerSet)) {
        powerSet.add(new XSet(set).add(aValue));
      }
    }
    return powerSet;
  }
}