import {FeedbackPost, Upvote, Category, Status } from '../models/model.ts';
import { Request } from 'express';

export default class ServiceOffers {
  async CreateFeedback(req: Request, title: string, description: string, category: string, status: string) {
    try {

      const post = await FeedbackPost.create({
        title,
        description,
        category,
        status,
        authorId: req.body.userId, // Используем userId из req.body
      });

      return post;
    } catch (error: any) {
      console.error('Ошибка при создании отзыва в сервисе:', error);
      throw error; // Пробрасываем ошибку в контроллер
    }
  }

  // Получение списка категорий
  async getCategories() {
    try {
      const categories = await Category.findAll();
      return categories;
    } catch (error: any) {
      console.error('Ошибка при получении категорий в сервисе:', error);
      throw error; // Пробрасываем ошибку в контроллер
    }
  }

  // Получение списка статусов
  async getStatuses() {
    try {
      const statuses = await Status.findAll();
      return statuses;
    } catch (error: any) {
      console.error('Ошибка при получении статусов в сервисе:', error);
      throw error; // Пробрасываем ошибку в контроллер ```typescript
    }
  }

  async upvote(req: Request, postId: string) {
    try {
      const upvote = await Upvote.create({
        userId: req.body.userId,
        postId,
      });

      return upvote;
    } catch (error: any) {
      console.error('Ошибка при голосовании в сервисе:', error);
      throw error; // Пробрасываем ошибку в контроллер
    }
  }

  async ReceiveFeedback(page: number, limit: number) {
    try {
      const posts = await FeedbackPost.findAll({
        limit: Number(limit),
        offset: (Number(page) - 1) * Number(limit),
        order: [['createdAt', 'DESC']],
      });

      return posts;
    } catch (error: any) {
      console.error('Ошибка при получении отзывов в сервисе:', error);
      throw error; // Пробрасываем ошибку в контроллер
    }
  }

  async getFeedbackPosts(
    page: number,
    limit: number,
    category?: string,
    status?: string,
    sortBy?: 'votes' | 'createdAt',
    order?: 'ASC' | 'DESC'
  ) {
    const offset = (page - 1) * limit;

    const where: any = {};
    if (category) where.category = category;
    if (status) where.status = status;

    const orderOptions: any = [];
    if (sortBy && order) {
      orderOptions.push([sortBy, order]);
    } else {
      orderOptions.push(['createdAt', 'DESC']); // Сортировка по умолчанию
    }

    return await FeedbackPost.findAll({
      where,
      order: orderOptions,
      limit,
      offset,
    });
  }
}