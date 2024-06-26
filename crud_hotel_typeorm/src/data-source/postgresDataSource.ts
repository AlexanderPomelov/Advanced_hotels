import { DataSource } from "typeorm";
import dotenv from "dotenv";
import { TestUser } from "../entityUser";

dotenv.config()

export const postgresDataSource = new DataSource({
    type: "postgres",
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    port: 5432,
    synchronize: true,
    entities: [ TestUser ],
})
