import { scrypt, randomBytes } from 'crypto';
import { promisify } from 'util';
const scryptAsync = promisify(scrypt)
export class Password {
    static async toHash(passw: string) {
        const salt = randomBytes(8).toString('hex');
        const buf = (await scryptAsync(passw, salt, 64)) as Buffer;
        return `${buf.toString('hex')}.${salt}`;
    }

    static async compare(storedPassw: string, suppliedPassw: string) {
        const [hashedPassw, salt] = storedPassw.split('.');
        const buff = (await scryptAsync(suppliedPassw, salt, 64)) as Buffer;
        return buff.toString('hex') === hashedPassw;
    }
}