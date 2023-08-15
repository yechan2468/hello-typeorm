import "reflect-metadata";
import { DataSource } from "typeorm";
import { Member } from "./entity/User.js";

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: "database.sqlite",
  synchronize: true,
  logging: false,
  entities: [Member],
  migrations: [],
  subscribers: [],
});
