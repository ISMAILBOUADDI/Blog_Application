const express = require('express');
const {createPostCtrl} = require("../../controllers/posts/PostCtrl");

const postRoute = express.Router();

postRoute.post("/", createPostCtrl);

module.exports = postRoute;