import mongoose from "mongoose";
import bcrypt from "bcrypt";
import uniqueValidator from "mongoose-unique-validator";

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    lowercase: true,
    required: [true, "can't be blank"],
    match: [/\S+@\S+\.\S+/, "is invalid"],
    index: true,
  },
  username: {
    type: String,
    lowercase: true,
    required: [true, "can't be blank"],
    match: [/^[a-zA-Z0-9]+$/, "is invalid"],
    index: true,
  },
  password: {
    type: String,
    required: [true, "Your password is required"],
    minlength: 6,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  watchList: {
    type: Array,
    default: [],
  },
});

UserSchema.pre("save", async function (next) {
  const hashedPassword = await bcrypt.hash(this.password, 12);
  this.password = hashedPassword;
  next();
});

UserSchema.plugin(uniqueValidator, { message: "is already taken." });

const User = mongoose.model("User", UserSchema);

export default User;
