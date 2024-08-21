const Category = require("../models/category");
const Recipe = require("../models/recipe.js");
const category = require("../models/category");

const categories = require("./categories.js");
const recipes = require("./recipes.js");

const dbConnect = require("../db/index.js");

dbConnect();

async function SeedData() {
  try {
    await Category.deleteMany({});
    await Recipe.deleteMany({});

    const createdCategories = await category.insertMany(categories);
    const lunch = createdCategories[1]._id;
    const sampleRecipes = recipes.map(recipe => {
      return { ...recipe, category: lunch };
    });
    await Recipe.insertMany(sampleRecipes);
    console.log("Data imported");
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

async function DestroyData() {
  try {
    await Category.deleteMany({});
    await Recipe.deleteMany({});

    await Recipe.insertMany(sampleRecipes);
    console.log("Data destroyed");
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}
if (process.argv[2] === "-d") {
  DestroyData();
} else {
  SeedData();
}
//console.log(process.argv);
