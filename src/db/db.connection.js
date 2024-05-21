// const mongoose = require("mongoose");
import mongoose from "mongoose";

const Connection = async () => {
  try { 
    await mongoose
      .connect(process.env.DATABASE_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log("Database connect successFully");
      });
  } catch (error) {
    console.log("----error", error);
  }
};

// module.exports = Connection;
export default Connection;
