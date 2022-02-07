const express = require("express");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// const myMiddlewere = (req, res, next) => {
//   if (req.headers.isvalid === "true") {
//     req.headers.isvalid = true;
//   } else {
//     req.headers.isvalid = false;
//   }
//   next();
// };

// app.use(myMiddlewere);

app.listen(8000);

const validate = (req, res, next) => {
  console.log(req.headers);
  if (req.headers.isvalid === "true") {
    next();
  } else {
    res.status(400).json({
      message: "Invalid request",
    });
  }
};

app.get("/api", validate, (req, res) => {
  res.status(200).json({
    message: "ok",
  });
});
