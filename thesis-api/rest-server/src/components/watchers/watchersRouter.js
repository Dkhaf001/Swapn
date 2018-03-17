import express from 'express';

const router = express.Router();
//user id is current logged in user
//add watching post
router.route('/add/:user_id/:post_id').post(addWatchesController);

//remove watching post
router.route('/remove/:user_id/:post_id').delete(removeWatchesController);

// get people your watching
router.route('/:user_id').get(fetchAllWatchesController);

export default router;
