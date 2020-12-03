function* generatroFn() {}

let generatorFn = function* () {}

let foo = {
  * generatorFn() {}
}

class Foo {
  * generatorFn() {}
}

class Bar {
  static * generatorFn() {}
}

const g = generatorFn();
console.log(g); // Object [Generator] {}
console.log(g.next); // [Function: next]
console.log(g[Symbol.iterator]);

console.log(g.next()); // { value: undefined, done: true }

function* generatorFn2() {
  return 'foo';
}
let generatorObject = generatorFn2();
console.log(generatorObject); // Object [Generator] {}
console.log(generatorObject.next()); // { value: 'foo', done: true }

function* generatorFn3() {
  console.log('foobar');
}

let generatorObject3 = generatorFn3();
generatorObject3.next(); // foobar


function* generatorFn4() {
  yield;
}
let generatorObject4 = generatorFn4();
console.log(generatorObject4.next()); // { value: undefined, done: false }
console.log(generatorObject4.next()); // { value: undefined, done: true }
console.log(generatorObject4.next()); // { value: undefined, done: true }

function* generatorFn5() {
  yield 'foo';
  yield 'bar';
  return 'baz';
}

let generatorObject5 = generatorFn5();
console.log(generatorObject5.next()); // { value: 'foo', done: false }
console.log(generatorObject5.next()); // { value: 'bar', done: false }
console.log(generatorObject5.next()); // { value: 'baz', done: true }
console.log(generatorObject5.next()); // { value: undefined, done: true }


function* generatorFn6() {
  yield 1;
  yield 2;
  yield 3;
}

for (const x of generatorFn6()) {
  console.log(x);
}
// 1
// 2
// 3

function* nTimes(n) {
  while(n--) {
    yield;
  }
}

for (let _ of nTimes(3)) {
  console.log('ff');
}

function* generatorFn7(initial) {
  console.log(initial);
  console.log(yield);
  console.log(yield);
}

let generatorObject8 = generatorFn7('foo');

generatorObject8.next('bar'); // foo
generatorObject8.next('baz'); // baz
generatorObject8.next('qux'); // qux

function* generatorFn9() {
  return yield 'foo';
}

let generatorObject9 = generatorFn9();
console.log(generatorObject9.next()); // { value: 'foo', done: false }
console.log(generatorObject9.next('bar')); // { value: 'bar', done: true }

function* range(start, end) {
  while(end > start) {
    yield start++;
  }
}

for (const x of range(4, 7)) {
  console.log(x);
}
// 4
// 5
// 6

function* zeroes(n) {
  while(n--) {
    yield 0;
  }
}
console.log(Array.from(zeroes(8))); // [ 0, 0, 0, 0, 0, 0, 0, 0 ]

function* generatorFn10() {
  yield* [1, 2, 3];
}

let generatorObject10 = generatorFn10();
for (const x of generatorFn10()) {
  console.log(x);
}
// 1
// 2
// 3

function* generatorFn11() {
  yield* [1, 2];
  yield *[3, 4];
  yield * [5, 6];
}

for (const x of generatorFn11()) {
  console.log(x);
}
// 1
// 2
// 3
// 4
// 5
// 6

function* generatorFn12() {
  console.log('iter value: ', yield* [1, 2, 3]);
}
for (const x of generatorFn12()) {
  console.log('value:', x);
}
// value: 1
// value: 2
// value: 3
// iter value:  undefined

function* innerGeneratorFn() {
  yield 'foo';
  return 'bar';
}
function*  outerGeneratorFn() {
  console.log('iter value:', yield* innerGeneratorFn());
}
for (const x of outerGeneratorFn()) {
  console.log('value:', x);
}
// value: foo
// iter value: bar


function* nTimes2(n) {
  if (n > 0) {
    yield* nTimes2(n - 1);
    yield n - 1;
  }
}
for (const x of nTimes2(3)) {
  console.log(x);
}
// 0
// 1
// 2

console.log('===');

class Node {
  constructor(id) {
    this.id = id;
    this.neighbors = new Set();
  }

  connect(node) {
    if (node !== this) {
      this.neighbors.add(node);
      node.neighbors.add(this);
    }
  }
}

class RandomGraph {
  constructor(size) {
    this.nodes = new Set();

    for (let i = 0; i < size; ++i) {
      this.nodes.add(new Node(i));
    }

    const threshold = 1 / size;
    for (const x of this.nodes) {
      for (const y of this.nodes) {
        if (Math.random() < threshold) {
          x.connect(y);
        }
      }
    }
  }

  print() {
    for (const node of this.nodes) {
      const ids = [...node.neighbors].map((n) => n.id).join(',');
      console.log(`${node.id}: ${ids}`);
    }
  }

  isConnected() {
    const visitedNodes = new Set();

    function* traverse(nodes) {
      for (const node of nodes) {
        if (!visitedNodes.has(node)) {
          yield node;
          yield* traverse(node.neighbors);
        }
      }
    }

    const firstNode = this.nodes[Symbol.iterator]().next().value;

    for (const node of traverse([firstNode])) {
      visitedNodes.add(node);
    }

    return visitedNodes.size === this.nodes.size;
  }
}

const g2 = new RandomGraph(6);
g2.print();
// 0: 4,2
// 1: 2,4,5
// 2: 1,0,4
// 3: 5
// 4: 0,1,2
// 5: 1,3

g2.isConnected();

class Foo2 {
  constructor() {
    this.values = [1, 2, 3];
  }

  * [Symbol.iterator]() {
    yield* this.values;
  }
}

const f2 = new Foo2();
for (const x of f2) {
  console.log(x);
}

function* generatorFn13() {
  for (const x of [1, 2, 3]) {
    yield x;
  }
}

const g3 = generatorFn13();
console.log(g3); // Object [Generator] {}
console.log(g3.next()); // { value: 1, done: false }
console.log(g3.return(4)); // { value: 4, done: true }
console.log(g3); // Object [Generator] {}
console.log(g3.next()); // { value: undefined, done: true }
console.log('~~~');

function* generatorFn14() {
  for (const x of [1, 2, 3]) {
    yield x;
  }
}

const g4 = generatorFn14();
for (const x of g4) {
  if (x > 1) {
    g4.return(4);
  }
  console.log(x);
}
// 1
// 2