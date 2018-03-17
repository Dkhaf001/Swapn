import express from 'express';
import {
  fetchAllFollowingController,
  addFollowingController,
  removeFollowingController
} from './followingsControllers';
const router = express.Router();

router.route('/').post(addFollowingController);

router.route('/:user_id').get(fetchAllFollowingController);

router.route('/:user_id/:following_id').delete(removeFollowingController);

export default router;
