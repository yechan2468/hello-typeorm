import "reflect-metadata";
import { DataSource } from "typeorm";
import { Movie } from "./entity/movie.js";
import { Director } from "./entity/director.js";
import { Actor } from "./entity/actor.js";
import { MovieBlob } from "./entity/movie_blob.js";

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: "database.sqlite",
  synchronize: true,
  logging: false,
  entities: [Movie, Director, Actor, MovieBlob],
  migrations: [],
  subscribers: [],
});
