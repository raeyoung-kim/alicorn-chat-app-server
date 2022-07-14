import express, { Request, Response, NextFunction } from 'express';
import User from '../models/User';

const router = express.Router();

router.get(
  '/search',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { query } = req;
      const users = await User.find();
      const result = users
        .filter((user) => {
          return user.name.includes(query.searchText! as string);
        })
        .map((user) => {
          return { name: user.name, userId: user.userId };
        });
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }
);

export default router;
