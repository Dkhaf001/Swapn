import express from 'express';
import {
  fetchAllPostsController,
  fetchUserPostsController,
  fetchSinglePostsController,
  updatePostsController,
  deletePostsController,
  addPostsController,
  increaseWCountController,
  decreaseWCountController,
} from './postsControllers';

const router = express.Router();
// get all
router.route('/').get(fetchAllPostsController);
// get user specific (user or buyer)
router.route('/:user_id').get(fetchUserPostsController);
// get single post
router.route('/fetchSinglePost/:post_id').get(fetchSinglePostsController);
// update post
router.route('/update/:user_id/:post_id').put(updatePostsController);
// delete post
router.route('/:user_id/:post_id').delete(deletePostsController);
// add a post
router.route('/:user_id').post(addPostsController);
// increase watch count
router.route('/increasewatch/:post_id').put(increaseWCountController);
// decrease watch count
router.route('/decreasewatch/:post_id').put(decreaseWCountController);
export default router;
