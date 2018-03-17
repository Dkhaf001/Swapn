import express from 'express';
import { fetchUserController, updateUserController } from './usersControllers';
const router = express.Router();

router.route('/:user_id').get(fetchUserController);

router.route('/').put(updateUserController);

export default router;
