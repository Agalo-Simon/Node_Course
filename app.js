const express = require("express");

const app = express();

//register view engine
app.set("view engine", "ejs");

app.listen(3000);

app.get("/", (req, res) => {
  //res.send('<p>Home Page</p>')
  //   res.sendFile("./views/index.html", { root: __dirname });
  res.render("index");
});
app.get("/about", (req, res) => {
  //   res.sendFile("./views/about.html", { root: __dirname });
  res.render("about");
});

//redirect
app.get("/about-us", (req, res) => {
  res.redirect("/about");
});

//404
app.use((req, res) => {
  res.render('404')
});
