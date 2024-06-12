import pkg from"pg";
import dotenv from "dotenv";

dotenv.config()

const { Pool } = pkg;

// Конфигурация базы данных PostgreSQL
export const pool = new Pool({
    user: process.env.DB_USER, 
    host: process.env.DB_HOST, 
    database: process.env.DB_NAME, 
    password: process.env.DB_PASSWORD, 
    port: process.env.DB_PORT ?? 5432,
  });

//Создание таблицы
export const createUserTable = `
  CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL
  );`;
