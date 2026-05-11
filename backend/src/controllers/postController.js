import mongoose from "mongoose";
import Post from "../models/Post.js";
import Tag from "../models/Tag.js";
import PostStat from "../models/PostStat.js";

export const createPost = async (req, res) => {
  //Tạo 1 session
  // const session = await mongoose.startSession();

  try {
    // session.startTransaction();
    //Điều kiện đầu vào
    const user = req.user;
    const {
      title,
      address,
      province,
      ward,
      price,
      size,
      description,
      features,
      listingType,
      propertyType,
      direction,
      balconyDirection,
      images,
      tags = [],
      location,
    } = req.body;

    // xử lý tags
    const tagDocs = await Promise.all(
      tags.map(async (t) => {
        const normalizedTag = t.trim().toLowerCase();
        let tag = await Tag.findOne({ tag: normalizedTag });
        if (!tag) tag = await Tag.create({ tag: normalizedTag });
        return { id: tag._id, tag: tag.tag };
      }),
    );

    // const tagDocs = await Promise.all(
    //   tags.map(async (tagName) => {
    //     console.log(tagName, typeof tagName);
    //     const rawTag = typeof tagName === "string" ? tagName : tagName?.tag;
    //     if (!rawTag) return null;
    //     const normalizedTag = rawTag.trim().toLowerCase();
    //     const tag = await Tag.findOneAndUpdate(
    //       { tag: normalizedTag },
    //       //Nếu chưa có tag thì tạo mới
    //       {
    //         $setOnInsert: {
    //           tag: normalizedTag,
    //           slug: slugify(normalizedTag, {
    //             lower: true,
    //             strict: true,
    //             locale: "vi",
    //           }),
    //         },
    //       },
    //       { returnDocument: "after", upsert: true, session },
    //     );
    //     return { _id: tag._id, tag: tag.tag };
    //   }),
    // );

    //Tạo post mới
    const post = await Post.create({
      idPost: `POST-${Date.now()}`,
      title,
      address,
      province,
      ward,
      price,
      size,
      description,
      features,
      listingType,
      propertyType,
      direction,
      balconyDirection,
      images,
      tags: tagDocs,
      location,
      user: {
        _id: user._id,
        fullname: user.fullname,
        phone: user.phone,
        avatarUrl: user.avatarUrl,
      },
      published: false,
      priorityScore: user?.pricing?.priority || 0,
      // expiredDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      expiredDate: null,
    });

    // const [post] = await Post.create(
    //   [
    //     {
    //       idPost: `POST-${Date.now()}`,
    //       title,
    //       address,
    //       province,
    //       ward,
    //       price,
    //       size,
    //       description,
    //       features,
    //       listingType,
    //       propertyType,
    //       direction,
    //       balconyDirection,
    //       images,
    //       tags: tagDocs,
    //       location,
    //       user: {
    //         _id: user._id,
    //         fullname: user.fullname,
    //         phone: user.phone,
    //         avatarUrl: user.avatarUrl,
    //       },
    //       priorityScore: user?.pricing?.priority || 0,
    //       expiredDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    //     },
    //   ],
    //   { session },
    // );
    // tạo stat
    await PostStat.create(
      // [
      { postId: post._id },
      // , { session }]
    );

    // await session.commitTransaction();

    res.status(201).json({ mesage: "Tạo mới bài tin thành cồng!", post });
  } catch (error) {
    //Rollback toàn bộ nếu fail
    // await session.abortTransaction();
    console.error("Lỗi khi tạo mới bài tin", error);
    return res.status(500).json({ message: "Lỗi hệ thống!" });
  }
  // finally {
  //   session.endSession();
  // }
};

export const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    //Tìm post và kiểm tra post có tồn tại
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ message: "Không tìm thấy bài đăng!" });
    }

    // Kiểm tra chủ bài đăng
    if (post.user._id.toString() !== userId.toString()) {
      return res.status(403).json({ message: "Không phải chủ bài đăng!" });
    }

    const updates = req.body;

    // update tags nếu có
    if (updates.tags) {
      const tagDocs = await Promise.all(
        updates.tags.map(async (t) => {
          let tag = await Tag.findOne({ tag: t });
          if (!tag) tag = await Tag.create({ tag: t });
          return { id: tag._id, tag: tag.tag };
        }),
      );
      updates.tags = tagDocs;
    }

    const updatedPost = await Post.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({ message: "Cập nhập bài tin thành công!", updatedPost });
  } catch (error) {
    console.error("Lỗi khi cập nhập bài tin", error);
    return res.status(500).json({ message: "Lỗi hệ thống!" });
  }
};

export const deletePost = async () => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({ message: "Không tìm thấy bài đăng!" });
    }

    if (post.user._id.toString() !== userId.toString()) {
      return res.status(403).json({ message: "Không phải chủ bài đăng!" });
    }

    await post.deleteOne();
    await PostStat.deleteOne({ postId: post._id });

    return res.sendStatus(204).json({ message: "Bài đăng đã xóa thành công!" });
  } catch (error) {
    console.error("Lỗi khi xóa bài đăng", error);
    return res.status(500).json({ message: "Lỗi hệ thống!" });
  }
};

export const getPosts = async (req, res) => {
  try {
    const {
      keyword,
      minPrice,
      maxPrice,
      province,
      listingType,
      propertyType,
      page = 1,
      limit = 10,
    } = req.query;

    let query = {
      published: true,
      status: "Còn trống",
      expiredDate: { $exists: true, $gte: new Date() },
    };

    // Text search
    if (keyword) {
      query.$text = { $search: keyword };
    }

    // Bộ lọc tìm kiếm
    if (province) query.province = province;
    if (listingType) query.listingType = listingType;
    if (propertyType) query.propertyType = propertyType;

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    const skip = (page - 1) * limit;

    const posts = await Post.find(query)
      .sort({
        priorityScore: -1,
        verified: -1,
        createdAt: -1,
      })
      .skip(skip)
      .limit(Number(limit));

    //Đếm tổng số bài đăng
    const total = await Post.countDocuments(query);

    res.status(200).json({
      data: posts,
      pagination: {
        total,
        page: Number(page),
        limit: Number(limit),
      },
    });
  } catch (error) {
    console.error("Lỗi khi lấy tất cả bài tin", error);
    return res.status(500).json({ message: "Lỗi hệ thống!" });
  }
};

export const getPostById = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({ message: "Không tìm thấY bài tin" });
    }

    // tăng view
    const isOwner = req.user?._id?.toString() === post.user._id.toString();
    if (!isOwner) {
      await PostStat.findOneAndUpdate({ postId: post._id }, { $inc: { views: 1 } });
    }
    const stat = await PostStat.findOne({ postId: post._id });

    res.status(200).json({
      ...post.toObject(),
      stats: stat,
    });
  } catch (error) {
    console.error("Lỗi khi lấy bài tin", error);
    return res.status(500).json({ message: "Lỗi hệ thống!" });
  }
};

export const getUserPosts = async (req, res) => {
  try {
    const userId = req.user?._id;
    if (!userId) return;

    //Lấy toàn bộ bài tin của user
    const posts = await Post.find({ "user._id": userId })
      .select("title slug price province images status verified createdAt")
      .sort({ createdAt: -1 });
    //Bắt lỗi khi không tìm thấy bài tin của user
    if (!posts.length) return res.status(404).json({ message: "Người dùng chưa có bài tin nào." });

    return res.status(200).json({ totalPosts: posts.length, posts });
  } catch (error) {
    console.error("Lỗi khi lấy các bài tin của người dùng", error);
    return res.status(500).json({ message: "Lỗi hệ thống!" });
  }
};

export const updateStatusPostByAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const { published, verified, status } = req.body;

    // Kiểm tra trạng thái bài tin
    const validStatus = ["Còn trống", "Đang đàm phán", "Đã bàn giao"];
    if (status !== undefined && !validStatus.includes(status)) {
      return res.status(400).json({ message: "Trạng thái bài đăng không hợp lệ" });
    }

    //Tim kiêm bài tin
    const post = await Post.findById(id);
    if (!post) return res.status(404).json({ message: "Không tìm thấy bài tin" });

    //Cho phép bài tin publish và set thời hạn cho bài tin
    if (published !== undefined) {
      post.published = published;
      //Set expiredDate khi publish lần đầu tiên
      if (published === true && !post.expiredDate) {
        const EXPIRED_DAYS = 30;
        post.expiredDate = new Date(Date.now() + EXPIRED_DAYS * 24 * 60 * 60 * 1000);
      }
      //Khi admin ẩn bài
      if (published === false) {
        post.expiredDate = null;
      }
    }

    //Verify - Xác thực pháp lý / thực tế
    if (verified !== undefined) {
      post.verified = verified;
    }

    //Status - Trạng thái giao dịch
    if (status !== undefined) {
      post.status = status;
    }

    await post.save();
    return res.status(200).json({
      message: "Cập nhật trạng thái bài đăng thành công",
      post,
    });
  } catch (error) {
    console.error("Lỗi xảy ra khi cập nhập trạng thái bài tin của người dùng bởi Admin", error);
    return res.status(500).json({ message: "Lỗi hệ thống!" });
  }
};
