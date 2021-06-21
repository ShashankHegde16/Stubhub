import { CustomError } from './custom-error';

export class NotAuthorizedError extends CustomError {
    statusCode = 401;

    constructor(message:string) {
        super(message);
        Object.setPrototypeOf(this, NotAuthorizedError.prototype)
    }

    serialiseErrors() {
        return [{
            message: this.message
        }]
    }
}