import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import mongoose from 'mongoose';
import { currentUserRouter } from './routes/curren_user';
import { signUpRouter } from './routes/singup';
import { signInRouter } from './routes/signin';
import { signOutRouter } from './routes/signout';
import { errorHandler } from './middlewares/error-handler';
import { DatabaseConnectionError } from './errors/database-connection';
import { NotFoundError } from './errors/not-found';

const app = express();
app.use(json());


app.use(currentUserRouter);
app.use(signUpRouter);
app.use(signInRouter);
app.use(signOutRouter);


app.all('*', (req, res, next) => {
    next(new NotFoundError());
});

app.use(errorHandler);

const connect = async () => {
    try {
        await mongoose.connect('mongodb://auth-db-srv:27017/auth', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        console.log('Database connection successfull!')
        app.listen(3000, () => {
            console.log('Listening on Port-', 3000);
        })
    } catch (e) {
        throw new DatabaseConnectionError();
    }

}

connect();
