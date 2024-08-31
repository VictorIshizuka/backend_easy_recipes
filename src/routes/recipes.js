var express = require("express");
var router = express.Router();
const multer = require("multer");

const Recipe = require("../models/recipe");
const loggedIn = require("../middleware/auth");

/* GET /api/recipes  */
router.get("/", async function (req, res, next) {
  const category = req.query.category;
  const difficulty = req.query.difficulty;
  const searchTerm = req.query.searchTerm
    ? { name: { $regex: req.query.searchTerm, $options: "i" } }
    : {};

  try {
    let query = Recipe.find(searchTerm);
    if (category) {
      query = query.where("category", category);
    }
    if (difficulty) {
      query = query.where("difficulty").in(difficulty.split(","));
    }
    const recipes = await query.exec();
    res.status(200).json(recipes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/* GET /api/recipes/:id  */
router.get("/:id", async function (req, res, next) {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) {
      res.status(404).json({ message: "Recipe not found" });
    }
    res.status(200).json(recipe);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/* POST /api/recipes */
router.post("/", loggedIn, async function (req, res, next) {
  try {
    req.body.name = req.body.name.trim();
    req.body.slug = req.body.name.trim().replace(/ /g, "-").toLowerCase();
    const recipe = await Recipe.create(req.body);
    res.status(201).json({ message: "Recipe created", recipe });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/* PUT /api/recipes/:id */
router.put("/:id", loggedIn, async function (req, res, next) {
  try {
    const id = req.params.id;
    const foundRecipe = await Recipe.findById(id);
    if (!foundRecipe) {
      res.status(404).json({ message: "Recipe not found" });
      return;
    }
    req.body.name = req.body.name.trim();
    req.body.slug = req.body.name.trim().replace(/ /g, "-").toLowerCase();
    const recipe = await Recipe.findByIdAndUpdate({ _id: id }, req.body, {
      new: true,
    });
    res.status(201).json({ message: "Recipe updated", recipe });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/* DELETE /api/recipes/:id */
router.delete("/:id", loggedIn, async function (req, res, next) {
  try {
    const foundRecipe = await Recipe.findById(req.params.id);
    if (!foundRecipe) {
      res.status(404).json({ message: "Recipe not found" });
      return;
    }
    await Recipe.findByIdAndDelete(req.params.id);
    //status 204 nao retorna mensagem apenas o 200
    res.status(200).json({ message: "Recipe destroyed", _id: req.params.id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//POST api/recipes/upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(
      null,
      "/Estudo/frontend/easy_recipes_full/frontend/frontend_easy_recipes/public/images"
    );
  },
  filename: function (req, file, cb) {
    cb(null, new Date().getTime() + "-" + file.originalname);
  },
});

function fileFilter(req, file, cb) {
  if (file.mimetype === "image/jpg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(new Error("Images only!"), false);
  }
}

const upload = multer({ storage, fileFilter });

const uploadSingle = upload.single("image");

router.post("/upload", loggedIn, function (req, res, next) {
  uploadSingle(req, res, function (err) {
    if (err) {
      return res.status(400).json({ message: err.message });
    }
    return res.status(200).json({
      message: "File uploaded",
      image: req.file.filename,
    });
  });
});

module.exports = router;
