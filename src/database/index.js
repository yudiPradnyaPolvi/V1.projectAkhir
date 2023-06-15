const mongoose = require("mongoose");

// mongoose.connect("mongodb://127.0.0.1:27017/project-akhir", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

async function connect() {
  await mongoose.connect(
    `mongodb://127.0.0.1:27017/project-akhir?authSource=admin`
  );

  const db = mongoose.connection;

  db.on("error", console.error.bind(console, "MongoDB connection error:"));
  db.once("open", function () {
    console.log("connected to mongodb");
  });
}

module.exports = { connect };
// const db = mongoose.connection;
