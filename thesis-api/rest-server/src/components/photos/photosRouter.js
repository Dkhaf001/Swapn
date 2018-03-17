import express from 'express';
import {
  fetchAllPhotosController,
  addPhotosController,
  removePhotosController
} from '../photos/photosControllers';

const router = express.Router();
//get photo
router.route('/:post_id').get(fetchAllPhotosController);
//add photo
router.route('/:post_id').post(addPhotosController);
// remove
router.route('/:post_id/:photo_id').delete(removePhotosController);

export default router;
