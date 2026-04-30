const express = require('express')
const routes = express.Router();
const blogController = require('../controllers/blogController')


// --- blog routes ---
routes.get("/", blogController.blog_index);
  // CREATE PAGE FIRST
  routes.get("/create", blogController.blog_create_get);
  // POST
  routes.post("/", blogController.blog_create_post);
  //--- dynamic params ---
  routes.get("/:id", blogController.blog_details);
  // --- delete blog ---
  routes.delete("/:id", blogController.blog_delete);

  module.exports = routes;