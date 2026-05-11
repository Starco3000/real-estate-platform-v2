import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Invalid email"],
    },
    phone: { type: String, required: true, unique: true, trim: true },
    fullname: { type: String, required: true, trim: true },
    hashedPassword: { type: String, required: true },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    avatarUrl: { type: String }, //Link CDN để hiển thị hình
    avatarId: { type: String }, //Cloudinary public_id để xóa hình
    balance: { type: Number, default: 0, min: 0 },
    score: { type: Number, default: 0 },
    emailVerified: { type: Boolean, default: false },
    phoneVerified: { type: Boolean, default: false },
    resetPwdToken: { type: String, select: false },
    resetPwdExpiry: { type: Date },
    pricing: {
      id: { type: mongoose.Schema.Types.ObjectId, ref: "Pricing" },
      name: String,
      priority: { type: Number, default: 0 },
    },
  },
  { timestamps: true },
);

const User = mongoose.model("User", userSchema);
export default User;
