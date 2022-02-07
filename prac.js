let date = new Date(Date.now());

console.log("date : ", date);

// let exact_date = new Date(date);
// /*
// let exact_date = Date(date); // Indian Standard TIme
// */

// console.log("exact_date : ",exact_date);
// date.get
const adventurer = {
  name: "Alice",
  cat: {
    name: "Dinah",
  },
};

const dogName = adventurer.dog?.name;
// console.log(dogName);
// expected output: undefined

// console.log(adventurer.someNonExistentMethod?.());
// expected output: undefined

// let date = new Date();
// console.log(date);

let [dd, mm, yyyy, HH, MM] = [
  String(date.getDate()).padStart(2, "0"),
  String(date.getMonth() + 1).padStart(2, "0"),
  date.getFullYear(),
  String(date.getHours()).padStart(2, "0"),
  String(date.getMinutes()).padStart(2, "0"),
];

const res = `${dd}/${mm}/${yyyy} ${HH}:${MM}`;  /* date format - (dd/mm/yyyy HH:MM) */

console.log(res);
