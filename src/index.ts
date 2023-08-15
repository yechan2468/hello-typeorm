import { createHash } from "node:crypto";
import { AppDataSource } from "./data-source.js";
import { Actor } from "./entity/actor.js";
import { Director } from "./entity/director.js";
import { Movie } from "./entity/movie.js";
import { MovieBlob } from "./entity/movie_blob.js";

interface MovieInfo {
  title: string;
  director: Director;
  actors: Actor[];
  release_year: number;
  rating: number;
  plot: string;
  movie_length: number;
}

await AppDataSource.initialize();

async function add_director(name: string, birth_date: Date) {
  const director = new Director();
  director.name = name;
  director.birth_date = birth_date;
  await director.save();
  return director;
}

async function add_actor(name: string, birth_date: Date) {
  const actor = new Actor();
  actor.name = name;
  actor.birth_date = birth_date;
  await actor.save();
  return actor;
}

async function add_movie(descriptor: MovieInfo) {
  const movie = new Movie();
  movie.title = descriptor.title;
  movie.release_year = descriptor.release_year;
  movie.rating = descriptor.rating;
  movie.plot = descriptor.plot;
  movie.movie_length = descriptor.movie_length;
  movie.director = descriptor.director;
  movie.actors = descriptor.actors;
  const new_blob = new MovieBlob();
  new_blob.blob = createHash("sha256").update(descriptor.title).digest("hex");
  movie.blob = new_blob;
  await movie.save();
  return movie;
}

async function add_oppenheimer() {
  const nolan = await add_director("크리스토퍼 놀란", new Date(1970, 6, 30));
  const murphy = await add_actor("킬리언 머피", new Date(1976, 4, 25));
  const blunt = await add_actor("에밀리 블런트", new Date(1983, 1, 23));
  const damon = await add_actor("맷 데이먼", new Date(1970, 9, 8));
  const downey = await add_actor("로버트 다우니 주니어", new Date(1965, 3, 4));
  const pugh = await add_actor("플로렌스 퓨", new Date(1996, 0, 3));
  const oppenheimer = await add_movie({
    title: "오펜하이머",
    director: nolan,
    actors: [murphy, blunt, damon, downey, pugh],
    release_year: 2023,
    rating: 7.8,
    plot: "“나는 이제 죽음이요, 세상의 파괴자가 되었다.”\n세상을 구하기 위해 세상을 파괴할 지도 모르는 선택을 해야 하는 천재 과학자의 핵개발 프로젝트.",
    movie_length: 180,
  });
  return oppenheimer;
}

async function get_all_movies() {
  return await Movie.find();
}

await add_oppenheimer();

console.log("all movies: ", await get_all_movies());

const movie2 = await Movie.createQueryBuilder("movie")
  .leftJoinAndSelect("movie.actors", "actors")
  .leftJoinAndSelect("movie.director", "director")
  .where("movie.id = 1")
  .getRawMany();

console.log(movie2);

const movie1 = await Movie.createQueryBuilder("movie")
  .leftJoinAndSelect("movie.actors", "actors")
  .leftJoinAndSelect("movie.director", "director")
  .where("movie.id = 1")
  .getOne();

console.log(movie1);

movie1.remove();
