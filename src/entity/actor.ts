import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToMany,
} from "typeorm";
import { Movie } from "./movie.js";

@Entity()
export class Actor extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: "date" })
  birth_date: Date;

  @ManyToMany(() => Movie, (Movie) => Actor)
  movies: Movie[];
}
