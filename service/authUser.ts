import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { User, RefreshToken } from '../models/model.ts';

export default class ServiceAuth {
  async register(email: string, password: string, avatar: string) {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({ email, password: hashedPassword, avatar });
  
      const accessToken = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_ACCESS_SECRET!,
        { expiresIn: '1h' }
      );
  
      const refreshToken = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_REFRESH_SECRET!,
        { expiresIn: '30d' }
      );
  
      await RefreshToken.create({ token: refreshToken, userId: user.id });
  
      return { user, accessToken, refreshToken };
    } catch (error: any) {
      console.error('Ошибка при регистрации:', error);
      throw new Error('Ошибка при регистрации');
    }
  }

  async login(email: string, password: string) {
    try {
      const user = await User.findOne({ where: { email } });
      if (!user || !(await bcrypt.compare(password, user.password))) {
        throw new Error('Неверные учетные данные');
      }
  
      const accessToken = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_ACCESS_SECRET!,
        { expiresIn: '1h' }
      );
  
      const refreshToken = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_REFRESH_SECRET!,
        { expiresIn: '30d' }
      );
  
      await RefreshToken.create({ token: refreshToken, userId: user.id });
  
      return { accessToken, refreshToken };
    } catch (error) {
      console.error('Ошибка при входе:', error);
      throw new Error('Ошибка при входе');
    }
  }

  async refresh(token: string) {
    try {
      const refreshToken = await RefreshToken.findOne({ where: { token } });
      if (!refreshToken) {
        throw new Error('Неверный токен');
      }
  
      const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET!) as { id: string };
  
      const user = await User.findByPk(decoded.id);
      if (!user) {
        throw new Error('Пользователь не найден');
      }
  
      const accessToken = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_ACCESS_SECRET!,
        { expiresIn: '1h' }
      );
  
      return { accessToken };
    } catch (error: any) {
      console.error('Ошибка при обновлении токена:', error);
      throw new Error('Ошибка при обновлении токена');
    }
  }
}