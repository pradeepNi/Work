const mongoose = require("mongoose");
const Model = require("./model");

main();

async function main() {
  try {
    await mongoose.connect("mongodb://localhost:27017/test");
    console.log("mongodb is connected........");
  } catch (error) {
    console.log(error);
  }
}

// const newModel = Model({
//   name: "Y",
//   studyDetail: [
//     { scholName: "ABC", startedAtAge: 13, studiedTillAge: 18 },
//     { scholName: "XYZ", startedAtAge: 19, studiedTillAge: 23 },
//   ],
// });

// newModel.save();
// Model.find({
//   $and: [
//     { "studyDetail.$.scholname": "XYZ" },
//     { "studyDetail.$.startedAtAge": { $lte: 20 } },
//     { "studyDetail.$.studiedTillAge": { $gte: 22 } },
//   ],
// }).then((res) => console.log(res));

// Model.find({
//   $and: [
//     { "studyDetail.$": { $elemMatch: { scholName: "XYZ" } } },
//     { "studyDetail.$": { $elemMatch: { startedAtAge: { $lte: 20 } } } },
//     { "studyDetail.$": { $elemMatch: { studiedTillAge: { $gte: 22 } } } },
//   ],
// }).then((res) => console.log(res));

// console.log(res);

// Model.find({
//   studyDetail : {}
// }).then((res) => console.log(res));

Model.findOne({
  studyDetail: {
    $elemMatch: {
      scholName: "XYZ",
      startedAtAge: { $lte: 20 },
      studiedTillAge: { $gte: 23 },
    },
  },
})
  .then((res) => console.log(res))
  .catch((err) => console.log("ERROR :  ", err));
