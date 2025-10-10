import mongoose from "mongoose";
const { Schema, model } = mongoose;

const userSchema = new mongoose.Schema({
    name: {type: String},
    email: {type: String, required: true, unique: true},
    username: {type: String, required: true, unique: true},
    profilepic: {type: String, default: "/profile.png"},
    coverpic: {type: String, default: "/cover.jpg"},
    razorpayid: {type: String},
    razorpaysecret: {type: String},
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

export default mongoose.models.User || model("User", userSchema);