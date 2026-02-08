//mongodb+srv://ghodkesujal5_db_user:7EZgUxzfo8bxQEFg@fedserver.ltxfxje.mongodb.net/?appName=FedServer

const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://kdmongo05_db_user:iByEmvU410F1S5zj@learning.h65rzks.mongodb.net/?appName=Learning"
    );
  } catch (err) {
    console.log("Mongo error:", err);
  }
};

connectDB();

module.exports = connectDB;
