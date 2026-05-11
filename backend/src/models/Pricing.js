import mongoose from "mongoose";

const pricingSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    isDisplayImmediately: { type: Boolean, default: false },
    isShowDescription: { type: Boolean, default: true },
    priority: { type: Number, default: 0 },
    requireScore: { type: Number, default: 0 },
    price: { type: Number, required: true },
    expiredDay: { type: Number, required: true },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Pricing", pricingSchema);
