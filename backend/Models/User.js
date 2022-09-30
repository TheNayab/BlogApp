const mongoose = require("mongoose");
const { Schema } = mongoose;
const UserSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },

  date: {
    type: Date,
    defult: Date.now,
  },
  blogs: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Blog",
      required: true,
    },
  ],
});
const User = mongoose.model("User", UserSchema);

module.exports = User;
