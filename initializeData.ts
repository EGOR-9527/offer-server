import { Category, Status } from './models/model'; // Импортируйте ваши модели

export async function initializeData() {
  try {
    // Проверяем, есть ли уже категории
    const categories = await Category.findAll();
    if (categories.length === 0) {
      await Category.bulkCreate([
        { name: 'Feature' },
        { name: 'Bug' },
        { name: 'Enhancement' }, 
      ]);
      console.log('Категории успешно добавлены.');
    }

    // Проверяем, есть ли уже статусы
    const statuses = await Status.findAll();
    if (statuses.length === 0) {
      await Status.bulkCreate([
        { name: 'Planned' },
        { name: 'In Progress' },
        { name: 'Completed' },
      ]);
      console.log('Статусы успешно добавлены.');
    }
  } catch (error) {
    console.error('Ошибка при инициализации данных:', error);
  }
}