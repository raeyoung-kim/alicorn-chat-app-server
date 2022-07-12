import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import 'express-async-errors';

dotenv.config();

import connect from './models';
import authRouter from './routes/auth';

const app = express();
connect();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());
app.use(
  cors({
    origin: process.env.ALLOWED_ORIGIN,
    credentials: true,
  })
);
app.use(cookieParser());
app.use(morgan('tiny'));

app.use('/auth', authRouter);

app.use((req: Request, res: Response, next: NextFunction) => {
  res.sendStatus(400);
});

app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  console.error(error);
  res.sendStatus(500);
});

app.listen(process.env.PORT || 8080, () => {
  console.log('hello world');
});
