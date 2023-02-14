const express = require("express");
const exphbs = require("express-handlebars");

const app = express();

app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");

app.get("/", function (req, res) {
  const user = {
    name: "Matheus",
    surname: "Battisti",
  };
  const pessoas = ['Item a', 'Item b', 'Item c','item d','item e','item f']
  res.render("home", { user: user, auth: true,pessoas});
});

app.get("/dashboard",function (req, res) {
  res.render("dashboard");
});

app.listen(5000);