import express from "express";
import {
  createPost,
  deletePost,
  getPostById,
  getPosts,
  getUserPosts,
  updatePost,
  updateStatusPostByAdmin,
} from "../controllers/postController.js";
import { optionalAuth, protectedRoute, protectedAdminRoute } from "../middlewares/authMiddleware.js";

const router = express.Router();

/*** USER ***/
// CREATE
router.post("/create-post", protectedRoute, createPost);

// READ
router.get("/", getPosts); //public
router.get("/me", protectedRoute, getUserPosts);
router.get("/:id", optionalAuth, getPostById);

// UPDATE
router.put("/:id", protectedRoute, updatePost);

// DELETE
router.delete("/:id", protectedRoute, deletePost);

/*** ADMIN ***/
router.put('/admin/:id/update-status', protectedAdminRoute, updateStatusPostByAdmin )

export default router;
