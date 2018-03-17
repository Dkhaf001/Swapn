import express from 'express';
import {
  fetchAllOffersController,
  addOffersController,
  removeOffersController
} from '../offers/offersController';

const router = express.Router();
// Search for all post Current User is trying to purchase
router.route('/:user_id').get(fetchAllOffersController);
//Add offer -opens chat
router.route('/add/:post_id/:user_id').post(addOffersController);
//Delete cancel offer Current User
router.route('/remove/:post_id/:user_id').delete(removeOffersController);

export default router;