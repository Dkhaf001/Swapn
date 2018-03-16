import express from 'express';
import { fetchCategorysController } from './categoriesControllers';

const router = express.Router();

router.route('/:type')
 .get(fetchCategorysController)

export default router;