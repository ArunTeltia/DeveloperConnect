const mongoose = require("mongoose");
const config = require("config");
const db = config.get("mongoURI"); //we can get any of the value in the json file

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    });
    console.log("MongoDB Connected...");
  } catch (err) {
    console.error(err.message);

    process.exit(1); //exit process with failure
  }
};

module.exports = connectDB;
