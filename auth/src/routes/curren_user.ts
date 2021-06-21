import express from 'express';
import { verifySession } from '../middlewares/auth-routes';
import { currentUser } from '../middlewares/current-user';
const router = express.Router();

router.get('/api/users/currentuser', currentUser, verifySession, (req, res) => {
    res.send({ currentUser: req.currentUser || null });

});

export { router as currentUserRouter };