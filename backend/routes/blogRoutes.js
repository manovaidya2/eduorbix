import express from 'express';
import * as blogController from '../controllers/blogController.js';

const router = express.Router();

// Blog routes
router.post('/blogs', blogController.createBlog);
router.get('/blogs', blogController.getAllBlogs);
router.get('/blogs/search', blogController.searchBlogs);
router.get('/blogs/category/:category', blogController.getBlogsByCategory);
router.get('/blogs/slug/:slug', blogController.getBlogBySlug);
router.get('/blogs/:id', blogController.getBlogById);
router.put('/blogs/:id', blogController.updateBlog);
router.delete('/blogs/:id', blogController.deleteBlog);


export default router;