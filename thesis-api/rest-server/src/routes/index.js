import express from 'express';

import authRouter from '../components/auth/authRouter';
import categoriesRouter from '../components/categories/categoriesRouter';
import followingsRouter from '../components/followings/followingsRouter';
import offersRouter from '../components/offers/offersRouter';
import photosRouter from '../components/photos/photosRouter';
import postsRouter from '../components/posts/postsRouter';
import usersRouter from '../components/users/usersRouter';
import watchersRouter from '../components/watchers/watchersRouter';

const router = express.Router();

router.use('/auth', authRouter);
router.use('/categories', categoriesRouter);
router.use('/followings', followingsRouter);
router.use('/offers', offersRouter);
router.use('/photos', photosRouter);
router.use('/posts', postsRouter);
router.use('/users', usersRouter);
router.use('/watchers', watchersRouter);

export default router;