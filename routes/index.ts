import express, { Request, Response } from 'express';
import ControllerAuth from '../controller/authUser';
import ControllerOffers from '../controller/offersUser';
import { authenticate } from '../middleware/authenticate'; // Импортируем middleware

const router = express.Router();

// Добавляем middleware для парсинга JSON-данных
router.use(express.json());

const authController = new ControllerAuth();
const offersController = new ControllerOffers();

// Регистрация и авторизация
router.post('/register', authController.register.bind(authController));
router.post('/login', authController.login.bind(authController));

// Защищенные маршруты с использованием middleware authenticate
router.post(
  '/createfeedback',
  (req, res, next) => {
    authenticate(req, res, next);
  },
  offersController.CreateFeedback.bind(offersController) // Привязываем контекст
);

router.post(
  '/upvote',
  (req, res, next) => {
    authenticate(req, res, next);
  },
  offersController.upvote.bind(offersController) // Привязываем контекст
);

// Получение отзывов (без аутентификации)
router.get('/receivefeedback', offersController.ReceiveFeedback.bind(offersController));

// Получение списка категорий (без аутентификации)
router.get('/categories', offersController.getCategories.bind(offersController));

// Получение списка статусов (без аутентификации)
router.get('/statuses', offersController.getStatuses.bind(offersController));

// Получение предложений с фильтрацией, сортировкой и пагинацией (без аутентификации)
router.get('/feedbackposts', offersController.getFeedbackPosts.bind(offersController));

export default router;