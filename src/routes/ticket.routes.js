import { Router } from 'express';
import { createTicket, getTickets, getTicketById } from '../controllers/ticket.controller.js';
import passport from 'passport';

const router = Router();

router.get('/', passport.authenticate('jwt', { session: false }), getTickets);
router.get('/:tid', passport.authenticate('jwt', { session: false }), getTicketById);
router.post('/', passport.authenticate('jwt', { session: false }), createTicket);

export default router;
