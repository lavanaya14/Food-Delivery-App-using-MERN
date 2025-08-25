import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://lavanayarajput:BRavEsToNE@cluster0.m4mgkx9.mongodb.net/food-del').then(() => console.log("DB Connected"));
}