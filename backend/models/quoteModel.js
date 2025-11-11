import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const quoteSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      required: true,
    },
    quote: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
      required: true,
    },
    portraitLink: {
      type: String,
      required: true,
    },
    wikipediaLink: {
      type: String,
      required: true,
    },
    artistName: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    imageSource: {
      type: String,
      required: true,
    },
    tags: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Quote = mongoose.model("Quote", quoteSchema);

export default Quote;
