import mongoose from 'mongoose';

const wishlistSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post',
      required: true,
      index: true,
    },
  },
  { timestamps: true },
);

// tránh duplicate
wishlistSchema.index({ userId: 1, postId: 1 }, { unique: true });

const Wishlist = mongoose.model('Wishlist', wishlistSchema);
export default Wishlist;
