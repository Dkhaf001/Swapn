import express from 'express';
import {
  fetchAllOffersController,
  addOffersController,
  removeOffersController,
  getSingleOffer,
  fetchPostOffers
} from '../offers/offersController';

const router = express.Router();
// Search for all post Current User is trying to purchase
router.route('/:username').get(fetchAllOffersController);
//Add offer -opens chat
router.route('/').post(addOffersController);
//Delete cancel offer Current User
router.route('/:post_id/:user_id').delete(removeOffersController);
//get single offer status for buyer post component
router.route('/getSingleOffer/:buyer_username/:post_id').get(getSingleOffer)

router.route('/fetchPostOffers/:post_id').get(fetchPostOffers)

export default router;
