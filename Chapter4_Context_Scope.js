var color = 'blue';

function changeColor() {
  if (color === 'blue') {
    color = 'red';
  } else {
    color = 'blue';
  }
}

changeColor();
console.log(color);

function add(num1, num2) {
  sum = num1 + num2;
  return sum;
}
let result = add(10, 20);
console.log(result);

var color2 = 'blue';
function getColor() {
  return color2;
}
console.log(getColor());