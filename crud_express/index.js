import express from 'express';
import {createUserTable, pool} from './db.js'
import router from './routes/userRoutes.js'

const app = express();

app.use(express.json());
app.use('/api', router)


pool.connect()


pool.query(createUserTable, (err, result) => {
    if (err) {
      console.error('Ошибка выполнения запроса:', err);
    } else {
      console.log(`Таблица создана`);
    }
  });

  
  // Запуск сервера
  const port = 8000;
  app.listen(port, () => {
    console.log(`Сервер запущен на http://localhost:${port}`);
  });

