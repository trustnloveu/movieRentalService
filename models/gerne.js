const mongoose = require("mongoose");
const Joi = require("joi");

// schema
const genreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
});

// modeling
const Genre = mongoose.model("Gerne", genreSchema);

// validate genre
function validateGenre(genre) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
  });
  return schema.validate(genre);
}

exports.genreSchema = genreSchema;
exports.Genre = Genre;
exports.validate = validateGenre;
