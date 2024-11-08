import mongoose from "mongoose";

export  const connectToDB =  () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("Mongo connected");
    })
    .catch((err) => {
      console.log("not connected");
    });
};
