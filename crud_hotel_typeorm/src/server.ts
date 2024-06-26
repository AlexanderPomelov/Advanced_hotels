import express, { Application } from 'express';
import router from './routes/userRoutes.js'
import { postgresDataSource } from "./data-source/postgresDataSource.js";
import userControllerdb from './controller/userControllerdb.js';

const app: Application = express();

app.use(express.json());
app.use('/api', router)


async function connect() {
    await postgresDataSource.initialize().then(() => {
        console.log("Data Source has been initialized! From server.ts");
    }).catch((err: any) => {
        console.error("Error during Data Source initialization: ", err);
    });
}
connect();

  // Запуск сервера
  const port = 8000;
  app.listen(port, () => {
    console.log(`Сервер запущен на http://localhost:${port}`);
  });

export default connect;
  


