import mongoose from 'mongoose';
import { Password } from '../services/password';

/**
 * Interface for creating the users
 */
interface UserKeys {
    email: string;
    password: string;
}

interface UserModel extends mongoose.Model<UserDocument> {
    build(attr: UserKeys): UserDocument;
}

interface UserDocument extends mongoose.Document {
    email: string;
    password: string;
}

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
},
    {
        toJSON: {
            transform(doc, ret) {
                ret.id = ret._id;
                delete ret._id;
                delete ret.password;
                delete ret.__v;
            }
        }
    });

userSchema.pre('save', async function (done) {
    // using the anonymos fn to make use of middleware functions
    // if password is modified hash it.
    if (this.isModified('password')) {
        const hashed = await Password.toHash(this.get('password'));
        this.set('password', hashed);
    }
    done();
});

userSchema.statics.build = (attr: UserKeys) => {
    return new User(attr);
}
const User = mongoose.model<UserDocument, UserModel>('User', userSchema);


export { User };