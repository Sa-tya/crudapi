import dotenv from 'dotenv';
import mongoose from "mongoose";
dotenv.config();

// const { MONGO_URI } = process.env;
const database = process.env.USERNAME;
const password = process.env.PASSWORD;

exports.connect = async () => {
  // Connecting to the database
  try {
    await mongoose.connect(`mongodb+srv://${database}:${password}@satya.lberk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`);
  } catch (error) {
    console.log(error);
  }
};