import express from 'express';
import {
  fetchAllFollowing,
  addFollowing,
  removeFollowing
} from './followingsControllers'
const router = express.Router();

router.route('/')
  .post(addFollowing)
  
router.route('/:user_id')
  .get(fetchAllFollowing)


router.route('/:user_id/:following_id')
  .delete(removeFollowing)

export default router;