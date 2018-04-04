import { sendEmail } from './emailController';

const router = express.Router();

router.route('/').post(sendEmail);

export default router;
