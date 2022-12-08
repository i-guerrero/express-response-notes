// DEPENDENCIES
const express = require("express");
const rocks = require("./models/rock.js");

// CONFIGURATION
const app = express();

// ROUTES - (Put specific routes before dynamic ones)
app.get("/", (req, res) => {
  res.send("Welcome to Express Minerals App");
});

app.get("/rocks", (req, res) => {
  res.send(rocks);
});

app.get("/rocks/awesome", (req, res) => {
  //this will never be reached
  res.send(`
        <h1>Rocks are awesome!</h1>
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Bismuth_crystal_macro.jpg/800px-Bismuth_crystal_macro.jpg" >
      `);
});

app.get("/rocks/:index", (req, res) => {
  const { index } = req.params;
  if (rocks[index]) {
    res.send(rocks[index]);
  } else {
    res.send("cannot find any rocks at this index: " + index);
  }
});

// MULTIPLE PARAMETERS
app.get("/hello/:firstName/:lastName", (req, res) => {
  console.log(req.params);
  const { firstName, lastName } = req.params;
  res.send(`hello ${firstName} ${lastName}`);
});

// ERROR
// app.get("/rocks/oops/:index", (req, res) => {
//   const { index } = req.params;
//   res.send(rocks[index]);
//   // error cannot send more than one response!
//   res.send("this is the index: " + index);
// });

// QUERY STRINGS
app.get("/calculator/:operator", (req, res) => {
  const { num1, num2 } = req.query;
  const { operator } = req.params;
  let sum = 0;
  if (operator === "add") {
    sum = Number(num1) + Number(num2);
    res.send("sum is " + sum);
  } else if (operator === "subtract") {
    sum = Number(num1) - Number(num2);
    res.send("difference is " + sum);
  } else if (operator === "multiply") {
    sum = Number(num1) * Number(num2);
    res.send("product is " + sum);
  } else if (operator === "divide") {
    sum = Number(num1) / Number(num2);
    res.send("quotient is " + sum);
  }
});

app.get("/rocks/:index", (req, res) => {
  //:index can be anything, even awesome
  res.send(rocks[req.params.index]);
});

// EXPORT
module.exports = app;
