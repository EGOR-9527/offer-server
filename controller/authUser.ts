import { Request, Response } from 'express';
import ServiceAuth from '../service/authUser';

export default class ControllerAuth {
  async register(req: Request, res: Response) {
    try {
      const { email, password, avatar } = req.body;

      const service = new ServiceAuth();
      const data = await service.register(email, password, avatar);

      // Сохраняем токен в куки
      res.cookie('token', data.accessToken, {
        httpOnly: true,
        secure: true,
        maxAge: 24 * 60 * 60 * 1000, // 1 день
      });

      res.status(201).json(data); // 201 Created
    } catch (error: any) {
      console.error('Ошибка при регистрации:', error);
      if (error.code === '23505') { // Ошибка уникальности (дубликат email)
        res.status(400).json({ message: 'Пользователь с таким email уже существует' });
      } else {
        res.status(500).json({ message: 'Ошибка сервера при регистрации' });
      }
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const service = new ServiceAuth();
      const data = await service.login(email, password);

      res.cookie('token', data.accessToken, {
        httpOnly: true,
        secure: true,
        maxAge: 24 * 60 * 60 * 1000, // 1 день
      });

      res.status(200).json(data); // 200 OK
    } catch (error: any) {
      console.error('Ошибка при входе:', error);
      res.status(500).json({ message: 'Ошибка сервера при входе' });
    }
  }

  async refresh(req: Request, res: Response) {
    try {
      const { refreshToken } = req.body;

      const service = new ServiceAuth();
      const data = await service.refresh(refreshToken);

      res.cookie('token', data.accessToken, {
        httpOnly: true,
        secure: true,
        maxAge: 24 * 60 * 60 * 1000, // 1 день
      });

      res.status(200).json(data); // 200 OK
    } catch (error: any) {
      console.error('Ошибка при обновлении токена:', error);
      res.status(500).json({ message: 'Ошибка сервера при обновлении токена' });
    }
  }
}