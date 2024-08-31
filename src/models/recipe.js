const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const recipeSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Recipe name is required"],
    },
    slug: { type: String, unique: true, required: true },
    description: {
      type: String,
      required: [true, "Recipe description is required"],
    },
    body: {
      type: String,
      required: [true, "Recipe body is required"],
      minLength: [10, "Recipe body must be at least 10 characters long"],
    },
    image: {
      type: String,
      default: "no_image.jpg",
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
