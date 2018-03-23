import express from 'express';
import {
  addWatchesController,
  removeWatchesController,
  fetchAllWatchesController,
  fetchSingleWatchesController
} from './watchersControllers';

const router = express.Router();
//user id is current logged in user
//add watching post
router.route('/:user_id/:post_id').post(addWatchesController);

// get single watch
router.route('/:user_id/:post_id').get(fetchSingleWatchesController);

//remove watching post
router.route('/:user_id/:post_id').delete(removeWatchesController);

// get people your watching
router.route('/:user_id').get(fetchAllWatchesController);

export default router;
