function Article() {
  this.title = 'Inauguration Ceremony Features Kazoo Band';
  this.author = 'Jake';
}
let a1 = new Article();
let a2 = new Article();
a1.author = null;

// --- 内存泄露例子 ---

// 意外声明全局变量
function setName() {
  name = 'Jake';
}

// 定时器
// let name = 'Jake';
// setInterval(() => {
//   console.log(name);
// }, 100);

// 闭包
let outer = function() {
  let name = 'Jake';
  return function() {
    return name;
  };
};
console.log(outer);

// --- end ---