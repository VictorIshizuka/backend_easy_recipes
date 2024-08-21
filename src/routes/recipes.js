var express = require("express");
var router = express.Router();

const Recipe = require("../models/recipe");

/* GET /api/recipes  */
router.get("/", async function (req, res, next) {
  try {
    const recipes = await Recipe.find({});

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
router.post("/", async function (req, res, next) {
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
router.put("/:id", async function (req, res, next) {
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
router.delete("/:id", async function (req, res, next) {
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

module.exports = router;
