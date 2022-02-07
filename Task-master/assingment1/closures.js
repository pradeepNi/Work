const add = (function () {
  let counter = 0;
  function plus() {
    counter += 1;
    return counter;
  }
  return plus;
})();

add();
add();
add();
add();

console.log(add());
