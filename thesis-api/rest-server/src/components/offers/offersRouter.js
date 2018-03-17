import express from 'express';
import { fetchAllOffersController } from '../offers/offersController';

const router = express.Router();
// Search for all post Current User is trying to purchase
router.route('/:user_id').get(fetchAllOffersController);

//Delete cancel offer Current User
router.route('/:post_id/:user_id').delete(removeOffersController);

export default router;
