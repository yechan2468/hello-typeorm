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

const nolan = await add_director("크리스토퍼 놀란", new Date(1970, 6, 30));
const russo = await add_director("앤서니 루소", new Date(1970, 1, 3));

const murphy = await add_actor("킬리언 머피", new Date(1976, 4, 25));
const blunt = await add_actor("에밀리 블런트", new Date(1983, 1, 23));
const damon = await add_actor("맷 데이먼", new Date(1970, 9, 8));
const downey = await add_actor("로버트 다우니 주니어", new Date(1965, 3, 4));
const pugh = await add_actor("플로렌스 퓨", new Date(1996, 0, 3));
const mcconaughey = await add_actor("매튜 맥커너히", new Date(1969, 10, 4));
const hathaway = await add_actor("앤 해서웨이", new Date(1982, 10, 12));
const caine = await add_actor("마이클 케인", new Date(1933, 2, 14));
const chastain = await add_actor("제시카 차스테인", new Date(1977, 2, 24));
const affleck = await add_actor("캐시 애플렉", new Date(1975, 7, 12));
const evans = await add_actor("크리스 에반스", new Date(1981, 5, 13));
const ruffalo = await add_actor("마크 러팔로", new Date(1967, 10, 22));
const hemsworth = await add_actor("크리스 헴스워스", new Date(1983, 7, 11));
const johansson = await add_actor("스칼렛 요한슨", new Date(1984, 10, 22));

async function add_oppenheimer() {
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

async function add_interstellar() {
  const interstellar = await add_movie({
    title: "인터스텔라",
    director: nolan,
    actors: [mcconaughey, hathaway, caine, chastain, affleck],
    release_year: 2014,
    rating: 8.0,
    plot: "`우린 답을 찾을 거야, 늘 그랬듯이`\n세계 각국의 정부와 경제가 완전히 붕괴된 미래가 다가온다. 지난 20세기에 범한 잘못이 전 세계적인 식량 부족을 불러왔고, NASA도 해체되었다.",
    movie_length: 169,
  });
  return interstellar;
}

async function add_avengers_endgame() {
  const interstellar = await add_movie({
    title: "어벤저스: 엔드게임",
    director: russo,
    actors: [downey, evans, ruffalo, hemsworth, johansson],
    release_year: 2019,
    rating: 7.9,
    plot: "인피니티 워 이후 절반만 살아남은 지구\n마지막 희망이 된 어벤져스\n먼저 떠난 그들을 위해 모든 것을 걸었다!",
    movie_length: 181,
  });
  return interstellar;
}

async function get_all_movies() {
  return await Movie.find();
}

await add_oppenheimer();
await add_interstellar();
await add_avengers_endgame();

console.log("\n\n\nall movies: ", await get_all_movies());

const movie1 = await Movie.createQueryBuilder("movie")
  .leftJoinAndSelect("movie.actors", "actors")
  .leftJoinAndSelect("movie.director", "director")
  .where("movie.id = 1")
  .getOne();

console.log("\n\n\n오펜하이머");
console.log(movie1);

const movie2 = await Movie.createQueryBuilder("movie")
  .leftJoinAndSelect("movie.actors", "actors")
  .leftJoinAndSelect("movie.director", "director")
  .where("movie.id = 2")
  .getRawMany();

console.log("\n\n\n인터스텔라");
console.log(movie2);

const nolan_movies = await Movie.createQueryBuilder("movie")
  .innerJoinAndSelect("movie.director", "director")
  .where('director.name = "크리스토퍼 놀란"')
  .getMany();

console.log("\n\n\n크리스토퍼 놀란 감독의 작품");
console.log(nolan_movies.map((movie) => movie.title));

const downey_movies = (
  await Movie.createQueryBuilder("movie")
    .innerJoinAndSelect("movie.actors", "actors")
    .getMany()
).filter((movie: Movie) => {
  for (const actor of movie.actors)
    if (actor.name === "로버트 다우니 주니어") return true;
  return false;
});

console.log("\n\n\n로버트 다우니 주니어의 출연작");
console.log(downey_movies.map((movie) => movie.title));

// movie1.remove();
