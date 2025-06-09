const mongoose = require("mongoose");

const promptSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  category_id: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
  sub_category_id: { type: mongoose.Schema.Types.ObjectId, ref: "SubCategory", required: true },
  prompt: { type: String, required: true },
  response: { type: String, required: true },
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Prompt", promptSchema);