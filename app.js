const express = require("express");

const app = express();
const morgan = require("morgan");

//register view engine
app.set("view engine", "ejs");

app.listen(3000);


//middleware and static files
app.use(express.static('public'))
app.use(morgan("dev"));

app.get("/", (req, res) => {
  const blogs = [
    { title: "Milk Tea", snipet: "Just enjoy some milk tea here" },
    { title: "Banana Juice", snipet: "Just enjoy some banana juice here" },
    { title: "Eggs", snipet: "Just enjoy some fridge eggs here" },
  ];

  //res.send('<p>Home Page</p>')
  //   res.sendFile("./views/index.html", { root: __dirname });
  res.render("index", { title: "Home", blogs });
});
app.get("/about", (req, res) => {
  //   res.sendFile("./views/about.html", { root: __dirname });
  res.render("about", { title: "About" });
});

app.get("/blogs/create", (req, res) => {
  res.render("create", { title: "Create a new Blog" });
});

//404
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
