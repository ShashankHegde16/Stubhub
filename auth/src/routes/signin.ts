import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';
import { User } from '../models/user';
import { ValidateRequest } from '../middlewares/validate-request';
import { BadRequestError } from '../errors/bad-request';
import { Password } from '../services/password';
import { updateJsxSpreadAttribute, updateSpreadAssignment } from 'typescript';
const router = express.Router();

router.post('/api/users/signin', [
    body('email')
        .isEmail()
        .withMessage('Enter valid email address.'),
    body('password')
        .trim()
        .notEmpty()
        .withMessage('Enter valid password.')
], ValidateRequest,
    async (req: Request, res: Response) => {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            throw new BadRequestError('Invalid email/password provided.')
        }
        const validPassw = await Password.compare(user.password, password);

        if (!validPassw) {
            throw new BadRequestError('Invalid email/password provided.')
        }

        const token = jwt.sign({
            id: user.id,
            email: user.email
        }, process.env.JWT_KEY!);

        req.session = {
            jwt: token
        }

        res.status(200).send(user);
        
    });

export { router as signInRouter };