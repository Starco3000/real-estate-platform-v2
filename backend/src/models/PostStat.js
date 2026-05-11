import mongoose from "mongoose";

const postStatSchema = new mongoose.Schema(
  {
    postId: { type: mongoose.Schema.Types.ObjectId, ref: "Post", required: true, unique: true },
    views: { type: Number, default: 0 },
    saves: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  },
);


export default mongoose.model("PostStat", postStatSchema);
