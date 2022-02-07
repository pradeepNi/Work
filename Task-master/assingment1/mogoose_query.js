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
