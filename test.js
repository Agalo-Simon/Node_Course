const express = require("express");
const mongoose = require("mongoose");
const Blog = require("./models/blog");


const app = express();
const morgan = require("morgan");

//Connect to mongodb
// const dbURI = "mongodb+srv://galos:galos1234@cluster0.jetmcd6.mongodb.net/";
const dbURI =
  "mongodb+srv://galos:galos1234@node-tuts.fzpfjur.mongodb.net/node-tuts";
mongoose
  .connect(dbURI)
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

//register view engine
app.set("view engine", "ejs");

//middleware and static files
app.use(express.static("public"));
app.use(morgan("dev"));

// --- add blog into database ---

app.get("/add-blog", (req, res) => {
  const blog = new Blog({
    title: "My new Blog 2",
    snipet: "About my new Blog",
    body: "More about my blog",
  });
  blog
    .save()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => console.log(err));
});

// --- Get all blogs ---

app.get("/all-blogs", (req, res) => {
  Blog.find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => console.log(err));
});

// --- get single blog ---
app.get("/single-blog", (req, res) => {
  Blog.findById('69f09971d7a5608ac092f395')
    .then((result) => {
      res.send(result);
    })
    .catch((err) => console.log(err));
});


app.get("/", (req, res) => {
  res.redirect('/blogs');
});
app.get("/about", (req, res) => {
  //   res.sendFile("./views/about.html", { root: __dirname });
  res.render("about", { title: "About" });
});


//--- blog routes ---

app.get("/blogs", (req, res) => {
  Blog.find()
    .then((result) => {
      res.send('index', {title: 'All Blogs', blogs: result});
    })
    .catch((err) => {
      console.log(err);
    });
});


app.get("/blogs/create", (req, res) => {
  res.render("create", { title: "Create a new Blog" });
});

//404
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
