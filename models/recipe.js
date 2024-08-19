const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const recipeSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Recipe name is required"],
    },
    slug: { type: String, required: true },
    description: {
      type: String,
      required: [true, "Recipe decription is required"],
    },
    body: {
      type: String,
      required: [true, "Recipe body is required"],
      minLength: [20, "Recipe body must be at least 20 characters long"],
    },
    image: {
      type: String,
      default: "noimage.jpg",
    },
    category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
    difficulty: {
      type: String,
      enum: ["easy", "medium", "hard"],
      required: [true, "Recipe difficulty is required"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Recipe", recipeSchema);
