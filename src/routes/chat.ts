import express, { Request, Response, NextFunction } from 'express';
import Chat from '../models/Chat';

const router = express.Router();

router.get('/list', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.query;
    const list = await (
      await Chat.find({ chatId: new RegExp(`${userId}`, 'i') })
    ).reverse();

    const result = list.filter((item, i) => {
      return (
        list.findIndex((item2, j) => {
          return item.chatId === item2.chatId;
        }) === i
      );
    });

    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
});

export default router;
