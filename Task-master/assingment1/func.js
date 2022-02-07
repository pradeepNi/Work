const intialVal = [
  {
    key: "name",
    value: null,
  },
  {
    key: "age",
    value: null,
  },
  {
    key: "lastName",
    value: null,
    dependency: {
      keyName: "name",
      condition: "firstLetterP",
      value: "P",
    },
  },
  {
    key: "middleName",
    value: null,
    dependency: {
      keyName: "name",
      condition: "firstLetterR",
      value: "R",
    },
  },
  {
    key: "Father Name",
    value: null,
    dependency: {
      keyName: "age",
      condition: false,
    },
  },
  {
    key: "Do You Drink",
    value: null,
    dependency: {
      keyName: "age",
      condition: true,
    },
  },
];

const fun = function (name, age, intialVal) {
  return intialVal.filter((it) => {
    return (
      !it.dependency ||
      (it.dependency.keyName === "age" &&
        (function () {
          switch (age >= 18) {
            case it.dependency.condition:
              return true;

            default:
              return false;
              
          }
        })()) ||
      (it.dependency.keyName === "name" &&
        (function () {
          switch (name[0]) {
            case it.dependency.value:
              return true;

            default:
              return false;
          }
        })())
    );
  });
};

console.log(fun("Pradeep", 20, intialVal));

// name R -- midle
