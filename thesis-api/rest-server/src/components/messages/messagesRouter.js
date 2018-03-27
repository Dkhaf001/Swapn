import express from 'express'
import { getMessages } from './messagesController'
const router = express.Router();

router.route('/:room_id').get(getMessages)

export default router