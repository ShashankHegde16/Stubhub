import { CustomError } from './custom-error';

export class BadRequestError extends CustomError {
    statusCode = 500;

    constructor(message:string) {
        super(message);
        Object.setPrototypeOf(this, BadRequestError.prototype)
    }

    serialiseErrors() {
        return [{
            message: this.message
        }]
    }
}