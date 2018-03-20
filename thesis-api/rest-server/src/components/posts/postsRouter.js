import express from 'express';
import {
  fetchAllPostsController,
  fetchUserPostsController,
  fetchSinglePostsController,
  updatePostsController,
  deletePostsController,
  addPostsController
} from './postsControllers';
const router = express.Router();
//get all
router.route('/').get(fetchAllPostsController);
//get user specific (user or buyer)
router.route('/:user_id').get(fetchUserPostsController);
//get single post
router.route('/:post_id').get(fetchSinglePostsController);
//update post
router.route('/:user_id/:post_id').put(updatePostsController);
//delete post
router.route('/:user_id/:post_id').delete(deletePostsController);
//add a post
router.route('/:user_id').post(addPostsController);

export default router;
