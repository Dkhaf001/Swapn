import express from 'express';
import { categorysController } from './categoriesControllers';

const router = express.Router();

router.route('/category/:type')
 .get(fetchCategorysController)

export default router;