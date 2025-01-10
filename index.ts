import express from 'express';
import cors from 'cors';
import sequelize from './db.js'; // Убедитесь, что путь правильный
import router from './routes';
import {initializeData} from './initializeData.ts'; // Импортируем функцию инициализации

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use('/api', router);

const start = async () => {
  try {
    // Подключение к базе данных
    await sequelize.authenticate();
    console.log('Соединение с базой данных успешно установлено.');

    // Синхронизация моделей с базой данных
    await sequelize.sync();
    console.log('Модели успешно синхронизированы.');

    // Инициализация данных (категории и статусы)
    await initializeData();
    console.log('Данные успешно инициализированы.');

    // Запуск сервера
    app.listen(PORT, () => console.log(`Сервер запущен на порту ${PORT}`));
  } catch (e) {
    console.error('Ошибка подключения к базе данных: ', e);
  }
};

start();