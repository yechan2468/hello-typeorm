import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany,
} from "typeorm";
import { Movie } from "./movie.js";

@Entity()
export class Director extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: "date" })
  birth_date: Date;

  @OneToMany(() => Movie, (Movie) => Director)
  movies: Movie[];
}
