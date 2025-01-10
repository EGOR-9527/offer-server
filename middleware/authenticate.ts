import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];
  console.log("token: ", token);
  if (!token) {
    return res.status(401).json({ message: 'Токен не предоставлен' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET!) as { id: string };
    req.body.userId = decoded.id; // Добавляем userId в req.body
    next();
  } catch (error) {
    res.status(401).json({ message: 'Неверный токен' });
  }
};