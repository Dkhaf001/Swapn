import express from 'express';
import {
  fetchAllFollowingController,
  addFollowingController,
  removeFollowingController,
  fetchFollowingController
} from './followingsControllers';

const router = express.Router();

router.route('/:user_id').get(fetchAllFollowingController);

router.route('/:user_id/:following_id').post(addFollowingController);

router.route('/:user_id/:following_id').get(fetchFollowingController);

router.route('/:user_id/:following_id').delete(removeFollowingController);

export default router;
