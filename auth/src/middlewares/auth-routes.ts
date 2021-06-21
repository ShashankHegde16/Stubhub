import { Request, Response, NextFunction } from 'express';
import { NotAuthorizedError } from '../errors/not-authorised-error';
export const verifySession = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (!req.currentUser) {
        throw new NotAuthorizedError('You are not authorized to access this end point..');
    }
    return next();
}