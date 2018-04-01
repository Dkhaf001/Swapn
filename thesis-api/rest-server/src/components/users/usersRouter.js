import express from 'express';
import {
  fetchUserController,
  updateUserController,
  updateProfilePicController,
} from './usersControllers';

const router = express.Router();

router.route('/:user_id').get(fetchUserController);

router.route('/location').put(updateUserController);
router.route('/profilepic').put(updateProfilePicController);
export default router;
