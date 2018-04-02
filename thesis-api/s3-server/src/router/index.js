import express from 'express';
import {
  fetchAlbumController,
  addAlbumController,
  removeAlbumController,
  addPhotoController,
  removePhotoController,
  addProfileController,
  removeProfileController,
} from '../controller';

const router = express.Router();

// ALBUM
// get photo album for post
router.get('/:post_id', fetchAlbumController);

// remove photo album and photos
router.delete('/:post_id', removeAlbumController);

// PHOTO
// --> BUG MVP +
// cant add photo with the same name it overides previous
router.post('/addphoto/:post_id', addPhotoController);

// key shoul have album/photoid  1/Clumsy_Smurf.jpg
// key is file name
router.delete('/removephoto/:post_id/:key', removePhotoController);

// profile pic
router.post('/addProfilePic/:user_id', addProfileController);
router.delete('/removeaddProfilePic/:user_id', removeProfileController);

export default router;
