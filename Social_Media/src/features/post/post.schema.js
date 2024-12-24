import mongoose from "mongoose";

export const postSchema = new mongoose.Schema({
  heding:{ type: String },
  caption: { type: String },
  imageUrl: { type: String, get: v => `${root}${v}` },
    userId: { type: mongoose.Types.ObjectId, ref: 'User' },
    comment:[{
      type:mongoose.Schema.Types.ObjectId,
      ref:'usercomment'    
  }],
 like: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Like",
    },
  ],
});
