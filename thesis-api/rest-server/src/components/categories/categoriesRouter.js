import express from 'express';
import { fetchAllCategorysController } from './categoriesControllers';

const router = express.Router();

router.route('/:category_id').get(fetchAllCategorysController);

export default router;
