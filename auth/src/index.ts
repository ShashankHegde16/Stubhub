import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import { currentUserRouter } from './routes/curren_user';
import { signUpRouter } from './routes/singup';
import { signInRouter } from './routes/signin';
import { signOutRouter } from './routes/signout';
import { errorHandler } from './middlewares/error-handler';
import { NotFoundError } from './errors/not-found';
const app = express();
app.use(json());

app.use(currentUserRouter);
app.use(signUpRouter);
app.use(signInRouter);
app.use(signOutRouter);


app.all('*',  (req,res,next) => {
    next(new NotFoundError());
});

app.use(errorHandler);


app.listen(3000, () => {
    console.log('Listening on Port-', 3000);
})