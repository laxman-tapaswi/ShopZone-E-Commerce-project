const { Schema, model } = require("mongoose");

const wishlistSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    items: [
      {
        type: Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
  },
  { timestamps: true }
);

const Wishlist = model("Wishlist", wishlistSchema);

module.exports = Wishlist;
