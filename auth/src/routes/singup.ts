import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { RequestValidationError } from '../errors/request-validation';
import { DatabaseConnectionError } from '../errors/database-connection';

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
    ], (req: Request, res: Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const error = new RequestValidationError(errors.array());
            throw error;
        }
        throw new DatabaseConnectionError();
        res.send({})
    });

export { router as signUpRouter };