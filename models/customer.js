const mongoose = require("mongoose");
const Joi = require("joi");

// model & schema
const Customer = mongoose.model(
  "Customer",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 50,
    },
    phone: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 50,
    },
    isGold: {
      type: Boolean,
      default: false,
    },
  })
);

// validation
function validateCustomer(customer) {
  const schema = Joi.object({
    name: Joi.string().min(2).max(50).required(),
    phone: Joi.string().min(2).max(50).required(),
    isGold: Joi.boolean(),
  });
  return schema.validate(customer);
}

// module.exports.Customer = Customer;
exports.Customer = Customer;
exports.validate = validateCustomer;
