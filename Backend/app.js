import express, { urlencoded } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { attemptCreate } from './models/admin.model.js';

const app = express();
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));


app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static('public'));
setImmediate(attemptCreate);

// routes import 
import userRouter from './routes/user.routes.js';

// routes declaration
app.use('/api/v1/users', userRouter);

export { app };