import express, { Request, Response } from 'express';
import { body} from 'express-validator';
import jwt from 'jsonwebtoken';
import { User } from '../models/user';
import { ValidateRequest } from '../middlewares/validate-request';
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
    ], ValidateRequest,
    async (req: Request, res: Response) => {

        const { email, password } = req.body;
        const existingUser = await User.findOne({ email });
console.log(existingUser)
        if (existingUser) {
            const error = new BadRequestError('An account with the email address already in use.');
            throw error;
        }

        const newUser = User.build({
            email, password
        });

        await newUser.save();

        const token = jwt.sign({
            id: newUser.id,
            email: newUser.email
        }, process.env.JWT_KEY!);

        req.session = {
            jwt: token
        }

        res.status(200).send(newUser);
    });

export { router as signUpRouter };