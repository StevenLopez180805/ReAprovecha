import dotenv from "dotenv";
import { User } from "../entities/User";
import { DataSource } from "typeorm";
import envs from "./environment-vars";

dotenv.config();
export const AppDataSource = new DataSource({
  type: "mysql",
  port: Number(envs.DB_PORT),
  username: envs.DB_USER,
  password: envs.DB_PASSWORD,
  database: envs.DB_NAME,
  synchronize: false,
  logging: true,
  entities: [User]
});

export const connectDB = async() => {
  try {
    await AppDataSource.initialize();
    console.log("Conectado a DB");
  } catch (error) {
    console.log("Conectado a DB");
    process.exit(1);
  }
}