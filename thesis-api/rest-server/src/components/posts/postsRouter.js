import express from 'express';
import {
  fetchUserPostsController,
  fetchAllPostsController,
  fetchSinglePostsController,
  addPostsController
} from './postsControllers';
const router = express.Router();
//get all
router.route('/').get(fetchAllPostsController);
//get user specific (user or buyer)
router.route('/fetchUser/:user_id').get(fetchUserPostsController);
//get single post
router.route('/fetchSingle/:user_id/:post_id').get(fetchSinglePostsController);
//add a post
router.route('/add/:user_id/:post_id').post(addPostsController);

export default router;
