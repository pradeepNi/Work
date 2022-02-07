const mongoose = require("mongoose");
const { Schema } = mongoose;

const mySchema = new Schema({
  name: String,
  studyDetail: [
    {
      scholName: String,
      startedAtAge: Number,
      studiedTillAge: Number,
    },
  ],
});

const testModel = mongoose.model("testmodel", mySchema);
module.exports = testModel;
