var mongoose = require("mongoose");

// Schemas for DB (Mongoose)
var campgroundSchema = new mongoose.Schema({
   name: String,
   image: String,
   description: String
});
module.exports = mongoose.model("Campground", campgroundSchema);
