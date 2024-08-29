var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

const dbConnect = require("./src/db/index.js");

const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();
dbConnect();

const recipesRouter = require("./src/routes/recipes.js");
const categoriesRouter = require("./src/routes/categories.js");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

app.use("/api/recipes", recipesRouter);
app.use("/api/categories", categoriesRouter);

module.exports = app;
