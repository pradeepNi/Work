// var a = 10;

const { stdout } = require("process");

//
if (true) {
  const a = 5;
}


// console.log(a);
let i = 0;
switch (false) {
  case true:
    console.log("case 1");

    break;
  case false:
    console.log("case 2");

    break;

  case `this${++i}`:
    console.log("case 3");

    break;

  default:
    break;
}

// console.log(i);


const obj = {
  name: "Pradeep",
  profile: "SDEI",
  branch: "chemical",
}

const {profile} = obj;

// console.log("profile : ", profile);

function isPositive(a) {
      if(a > 0) {
        console.log("YES");
        return;
      }
      if(a === 0) throw "Zero Error";
      if(a < 0) throw "Negative Error";
  
}

// try {
//   isPositive(5);
// } catch (error) {
//   console.log(error);
// }

const add = (function () {
  let counter = 0;
  return function () {counter += 1; return counter}
})();

add();
add();
add();

console.log(add());
stdout.write(add().toString());
