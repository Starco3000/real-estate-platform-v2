import mongoose from "mongoose";
import slugify from "slugify";

const tagSchema = new mongoose.Schema(
  {
    tag: { type: String, required: true, trim: true, unique: true },
    slug: { type: String, unique: true },
  },
  {
    timestamps: true,
  },
);

tagSchema.pre("save", function () {
  if (this.tag) {
    this.tag = this.tag.trim().toLowerCase();

    this.slug = slugify(this.tag, { lower: true, strict: true });
  }
});

export default mongoose.model("Tag", tagSchema);
