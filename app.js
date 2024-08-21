var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

const dbConnect = require("./src/db/index.js");

const dotenv = require("dotenv");

dotenv.config();
dbConnect();

var recipesRouter = require("./src/routes/recipes.js");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/recipes", recipesRouter);

module.exports = app;
