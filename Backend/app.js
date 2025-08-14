import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

app.get('/', (req, res) => {    
    res.send('Hello World');
});

// app.use('/users', userRoutes);
// app.use('/captains', captainRoutes);

module.exports = app;