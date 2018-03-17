import express from 'express';
import {
  fetchAllPostsController,
  fetchUserPostsController,
  fetchSinglePostsController,
  updatePostsController,
  addPostsController
} from './postsControllers';
const router = express.Router();
//get all
router.route('/').get(fetchAllPostsController);
//get user specific (user or buyer)
router.route('/:user_id').get(fetchUserPostsController);
//get single post
router.route('/:user_id/:post_id').get(fetchSinglePostsController);
//update post
router.route('/:user_id/:post_id').put(updatePostsController);
//add a post
router.route('/:user_id').post(addPostsController);

export default router;
