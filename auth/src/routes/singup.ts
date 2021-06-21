import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { User } from '../models/user';
import { RequestValidationError } from '../errors/request-validation';
import { BadRequestError } from '../errors/bad-request';
const router = express.Router();

router.post('/api/users/signup',
    [
        body('email')
            .isEmail()
            .withMessage('Invalid email!'),
        body('password')
            .trim()
            .isLength({ min: 4, max: 10 })
            .withMessage('Password must be between 4 and 10 characters.')
    ], async (req: Request, res: Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const error = new RequestValidationError(errors.array());
            throw error;
        }
        const { email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            const error = new BadRequestError('An account with the email address already in use.');
            throw error;
        }
        const newUser = User.build({
            email, password
        });
        await newUser.save();
        res.status(200).send(newUser);
    });

export { router as signUpRouter };