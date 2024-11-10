// routes/waitlist.js
import express from 'express';
import { addUserToWaitlist, addAgentToWaitlist } from '../controller/waitlist.js';
import { validateWaitlistData } from '../middlewares/validator.js';

const router = express.Router();

router.post('/user', validateWaitlistData, addUserToWaitlist);
router.post('/agent', validateWaitlistData, addAgentToWaitlist);

export default router;
