import mongoose from "mongoose";
import slugify from "slugify";

// const postSchema = new mongoose.Schema(
//   {
//     title: { type: String, required: true, trim: true, index: true },
//     description: { type: String, trim: true },
//     price: { type: Number, required: true, index: true },
//     size: { type: Number },
//     propertyType: {
//       type: String,
//       enum: [
//         'Căn hộ chung cư',
//         'Nhà mặt phố',
//         'Nhà riêng',
//         'Nhà phố thương mại',
//         'Biệt thự',
//         'Đất nền',
//         'Bán đất',
//         'Trang trại',
//         'Khu nghỉ dưỡng',
//         'Kho',
//         'Nhà xưởng',
//         'Khác',
//       ],
//       required: true,
//       index: true,
//     },
//     listingType: { type: String, enum: ['SALE', 'RENT'], required: true, index: true },
//     location: {
//       address: { type: String, trim: true },
//       province: { type: String, trim: true, index: true },
//       ward: { type: String, trim: true },
//       coordinates: {
//         type: {
//           type: String,
//           enum: ['Point'],
//           default: 'Point',
//         },
//         coordinates: {
//           type: [Number], // [lng, lat]
//           index: '2dsphere',
//         },
//       },
//     },
//     features: {
//       floor: Number,
//       bedroom: Number,
//       bathroom: Number,
//       isFurniture: {
//         type: Boolean,
//         default: false,
//       },
//     },
//     direction: { type: String, trim: true },
//     balonyDirection: { type: String, trim: true },
//     images: [
//       {
//         url: { type: String, required: true, trim: true },
//         isPrimary: { type: Boolean, default: false },
//       },
//     ],
//     owner: {
//       userId: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'User',
//         required: true,
//       },
//       fullname: String,
//     },
//     status: {
//       type: String,
//       enum: ['AVAILABLE', 'NEGOTIATING', 'SOLD'],
//       default: 'AVAILABLE',
//       index: true,
//     },
//     tags: [{ type: String, trim: true }],
//     verified: { type: Boolean, default: false },
//     expiredDate: Date,
//     expiredBoost: Date,
//   },
//   { timestamps: true },
// );

const postSchema = new mongoose.Schema(
  {
    idPost: { type: String, required: true, unique: true },
    title: { type: String, required: true, trim: true },
    slug: { type: String, unique: true },
    address: { type: String, required: true, trim: true },
    province: { type: String, required: true, trim: true, index: true },
    ward: { type: String, trim: true },
    location: {
      type: { type: String, enum: ["Point"], default: "Point" },
      coordinates: {
        type: [Number], // [lng, lat]
        default: [0, 0],
      },
    },
    price: { type: Number, required: true, index: true },
    size: { type: Number, required: true, index: true },
    description: { type: String, default: "" },
    features: {
      floor: { type: Number, default: 0 },
      bedroom: { type: Number, default: 0, index: true },
      bathroom: { type: Number, default: 0 },
      isFurniture: { type: Boolean, default: false },
    },
    listingType: { type: String, enum: ["Bán", "Cho thuê"], required: true, index: true },

    propertyType: {
      type: String,
      enum: [
        "Căn hộ chung cư",
        "Nhà mặt phố",
        "Nhà riêng",
        "Nhà phố thương mại",
        "Biệt thự",
        "Đất nền",
        "Bán đất",
        "Trang trại",
        "Khu nghỉ dưỡng",
        "Kho",
        "Nhà xưởng",
        "Khác",
      ],
      required: true,
      index: true,
    },
    direction: {
      type: String,
      enum: ["Đông", "Tây", "Nam", "Bắc", "Đông - Bắc", "Tây - Nam", "Đông - Nam", "Tây - Bắc"],
    },
    balconyDirection: {
      type: String,
      enum: ["Đông", "Tây", "Nam", "Bắc", "Đông - Bắc", "Tây - Nam", "Đông - Nam", "Tây - Bắc"],
    },
    status: {
      type: String,
      enum: ["Còn trống", "Đang đàm phán", "Đã bàn giao"],
      default: "Còn trống",
      index: true,
    },
    published: { type: Boolean, default: false, index: true },
    verified: { type: Boolean, default: false, index: true },
    expiredDate: Date,
    expiredBoost: Date,
    images: { type: [String], default: [] },
    user: {
      _id: mongoose.Schema.Types.ObjectId,
      fullname: String,
      phone: String,
      avatarUrl: String,
    },
    tags: [
      {
        _id: false,
        id: mongoose.Schema.Types.ObjectId,
        tag: String,
      },
    ],
    searchText: { type: String },
    priorityScore: { type: Number, default: 0, index: true },
  },
  {
    timestamps: true,
  },
);

// TEXT INDEX
postSchema.index({
  title: "text",
  address: "text",
  province: "text",
  ward: "text",
  searchText: "text",
});

// GEO INDEX
postSchema.index({ location: "2dsphere" });

// COMPOUND INDEX
postSchema.index({
  listingType: 1,
  propertyType: 1,
  price: 1,
  province: 1,
});

// PRE SAVE
postSchema.pre("save", function () {
  // slug
  if (this.title) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }

  if (!this.idPost) {
    this.idPost = `POST_${Date.now()}`;
  }

  // search text
  this.searchText = [this.title, this.address, this.province, this.ward, this.propertyType]
    .join(" ")
    .toLowerCase();
});

const Post = mongoose.model("Post", postSchema);
export default Post;
