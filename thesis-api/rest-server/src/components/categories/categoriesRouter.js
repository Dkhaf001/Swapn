import express from 'express';
import { fetchAllCategorysController } from './categoriesControllers';

const router = express.Router();

router.route('/:type')
 .get(fetchAllCategorysController)

export default router;