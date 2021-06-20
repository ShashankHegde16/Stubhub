import mongoose from 'mongoose';

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
});

userSchema.statics.build = (attr: UserKeys) => {
    return new User(attr);
}
const User = mongoose.model<UserDocument, UserModel>('User', userSchema);


export { User };