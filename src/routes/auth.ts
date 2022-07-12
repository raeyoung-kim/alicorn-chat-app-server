import express, { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/User';

const router = express.Router();

const { JWT_SECRECT_KEY } = process.env;

router.post(
  '/sign-up',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { userId, name, password } = req.body;

      const user = await User.findOne({ userId });

      if (user) {
        return res.status(409).json({
          message: '이미 존재하는 아이디 입니다 :(',
        });
      } else {
        const hashPW = await bcrypt.hash(password, 10);

        await User.create({
          userId,
          name,
          password: hashPW,
        });

        return res.status(201).json({
          message: 'success',
        });
      }
    } catch (err) {
      next(err);
    }
  }
);

router.post(
  '/sign-in',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { userId, password } = req.body;
      const user = await User.findOne({ userId });
      if (!user) {
        return res.status(401).json({ message: 'Invalid user or password' });
      }
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        return res.status(401).json({ message: 'Invalid user or password' });
      }
      const token = jwt.sign({ id: userId }, JWT_SECRECT_KEY! as string, {
        expiresIn: '2d',
      });

      res
        .cookie('token', token, {
          maxAge: 1000 * 60 * 60 * 24 * 2,
          httpOnly: true,
          sameSite: 'none',
          secure: true,
        })
        .status(200)
        .json({
          message: 'success',
          user: {
            userId: user.userId,
            name: user.name,
            image: user.image,
          },
        });
    } catch (err) {
      next(err);
    }
  }
);

router.get('/me', async (req: Request, res: Response, next: NextFunction) => {
  try {
    let token: string | undefined;
    const authHeader = req.get('Authorization');
    if (authHeader && authHeader?.startsWith('Bearer')) {
      token = authHeader.split(' ')[1];
    }

    if (!token) {
      token = req.cookies['token'];
    }

    if (!token) {
      return res.status(401).json({
        message: 'auth error',
      });
    }

    jwt.verify(
      token,
      JWT_SECRECT_KEY! as string,
      async (err: any, decode: any) => {
        if (err) {
          return res.status(401);
        }
        const user = await User.findOne({ userId: decode.id });
        if (!user) {
          return res.status(401);
        }
        res
          .cookie('token', token, {
            maxAge: 1000 * 60 * 60 * 24 * 2,
            httpOnly: true,
            sameSite: 'none',
            secure: true,
          })
          .status(200)
          .json({
            message: 'success',
            user: {
              userId: user.userId,
              name: user.name,
              image: user.image,
            },
          });
      }
    );
  } catch (err) {
    next(err);
  }
});

router.post(
  '/logout',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.cookie('token', '').status(200).json({
        message: 'success',
      });
    } catch (err) {
      next(err);
    }
  }
);

export default router;
