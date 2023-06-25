const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    username: String,
    password: String,
  },
  { collection: "users" }
);

module.exports = mongoose.model("User", schema);
