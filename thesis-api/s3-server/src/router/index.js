import express from 'express';
import {
  fetchAlbumController,
  addAlbumController,
  removeAlbumController,
  addPhotoController,
  removePhotoController,
} from '../controller';

const router = express.Router();
// get photo album for post
router.get('/album/:post_id', fetchAlbumController);
// add photo album for post
router.post('/album/:post_id', addAlbumController);
// remove photo album for post
router.delete('/album/:post_id', removeAlbumController);
// add single photo from album
router.post('/addphoto', addPhotoController);
// remove single photo from album
router.delete('/removephoto/:id', removePhotoController);

export default router;
