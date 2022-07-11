import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';

const app = express();

app.use((req: Request, res: Response, next: NextFunction) => {
  next(404);
});

app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  console.error(error);
  res.status(500);
});

app.listen(process.env.PORT || 8080, () => {
  console.log('hello world');
});
