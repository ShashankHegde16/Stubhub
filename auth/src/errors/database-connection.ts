import { CustomError } from './custom-error';

export class DatabaseConnectionError extends CustomError {
    reason = 'Error in connecting to database';
    statusCode = 500;

    constructor() {
        super('Error in connecting to database');
        Object.setPrototypeOf(this, DatabaseConnectionError.prototype)
    }

    serialiseErrors() {
        return [{
            message: this.reason
        }]
    }
}