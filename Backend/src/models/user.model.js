const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please Enter Name"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Please Enter Email"],
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please Enter Password"],
      min: [6, "Password should be 6 character"],
      trim: true,
      select: false,
    },

    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
  },
  { timestamps: true }
);

//  password hase before save
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  this.password = await bcrypt.hash(this.password, 10);
});

//  user match the password
userSchema.methods.matchPassord = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// user generate token
userSchema.methods.generateToken = function () {
  let token = jwt.sign({ _id: this._id }, process.env.JWT_TOKEN_SECRET, {
    expiresIn: "3d",
  }); // { expiresIn: '1d' }
  return token;
};

const User = model("User", userSchema);

module.exports = User;
