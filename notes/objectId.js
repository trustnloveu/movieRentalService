const mongoose = require("mongoose");

// creating a unique identifier
const id = mongoose.Types.ObjectId();

console.log(id);
console.log(id.getTimestamp());

// for validation
const isValid = mongoose.Types.ObjectId.isValid("1234");
console.log(isValid);
