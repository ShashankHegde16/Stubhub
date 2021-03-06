import { CustomError } from './custom-error';

export class NotFoundError extends CustomError {
    statusCode = 404;

    constructor() {
        super('Requested route not found..');
        Object.setPrototypeOf(this, NotFoundError.prototype)
    }

    serialiseErrors() {
        return [{
            message:'Requested route not found..'
        }]
    }
}