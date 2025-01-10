import { Request, Response } from "express";
import ServiceOffers from "../service/offersUser";

export default class ControllerOffers {
  private service: ServiceOffers;

  constructor() {
    this.service = new ServiceOffers();
    // Привязываем контекст this к методам
    this.CreateFeedback = this.CreateFeedback.bind(this);
    this.upvote = this.upvote.bind(this);
    this.ReceiveFeedback = this.ReceiveFeedback.bind(this);
    this.getCategories = this.getCategories.bind(this);
    this.getStatuses = this.getStatuses.bind(this);
    this.getFeedbackPosts = this.getFeedbackPosts.bind(this);
  }

  async CreateFeedback(req: Request, res: Response) {
    try {
      const { title, description, category, status } = req.body;

      const data = await this.service.CreateFeedback(
        req,
        title,
        description,
        category,
        status
      );

      res.status(201).json(data); // 201 Created
    } catch (error) {
      console.error("Ошибка при создании отзыва:", error);
      res.status(500).json({ message: "Ошибка сервера при создании отзыва" });
    }
  }

  async upvote(req: Request, res: Response) {
    try {
      const { postId } = req.body;

      const data = await this.service.upvote(req, postId);

      res.status(201).json(data); // 201 Created
    } catch (error: any) {
      console.error("Ошибка при голосовании:", error);
      res.status(500).json({ message: "Ошибка сервера при голосовании" });
    }
  }

  async ReceiveFeedback(req: Request, res: Response) {
    try {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 10;

      const data = await this.service.ReceiveFeedback(page, limit);

      res.status(200).json(data); // 200 OK
    } catch (error: any) {
      console.error("Ошибка при получении отзывов:", error);
      res.status(500).json({ message: "Ошибка сервера при получении отзывов" });
    }
  }

  async getCategories(req: Request, res: Response) {
    try {
      const categories = await this.service.getCategories();
      res.status(200).json(categories);
    } catch (error) {
      res.status(500).json({ message: "Ошибка при получении категорий" });
    }
  }

  async getStatuses(req: Request, res: Response) {
    try {
      const statuses = await this.service.getStatuses();
      res.status(200).json(statuses);
    } catch (error) {
      res.status(500).json({ message: "Ошибка при получении статусов" });
    }
  }

  async getFeedbackPosts(req: Request, res: Response) {
    const { page = 1, limit = 10, category, status, sortBy, order } = req.query;

    try {
      const posts = await this.service.getFeedbackPosts(
        Number(page),
        Number(limit),
        category as string,
        status as string,
        sortBy as "votes" | "createdAt",
        order as "ASC" | "DESC"
      );
      res.status(200).json(posts);
    } catch (error) {
      res.status(500).json({ message: "Ошибка при получении предложений" });
    }
  }
}