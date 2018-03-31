import express from 'express';
import {
  fetchAllPhotosController,
  addPhotosController,
  removePhotosController,
  removeAllPhotosController,
} from '../photos/photosControllers';

const router = express.Router();
// get photo
router.route('/:post_id').get(fetchAllPhotosController);
// add photo
router.route('/:post_id').post(addPhotosController);
// remove
router.route('/removesingle/:post_id/:photo_id').delete(removePhotosController);
// remove All
router.route('/removeall/:post_id').delete(removeAllPhotosController);

export default router;
