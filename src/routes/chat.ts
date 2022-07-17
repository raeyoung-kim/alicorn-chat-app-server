import express, { Request, Response, NextFunction } from 'express';
import { getMessageList } from '../socket';

const router = express.Router();

router.get('/list', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.query;

    const result = await getMessageList(userId! as string);

    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
});

export default router;
