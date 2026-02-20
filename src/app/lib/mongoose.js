import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config()
let URLDATABASE = process.env.URLDATABASE

if (!URLDATABASE) {
  throw new Error("Please define URLDATABASE in .env.local");
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    
    cached.promise = mongoose.connect(URLDATABASE).then((mongoose) => {
      return mongoose;
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectDB;