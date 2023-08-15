import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToOne,
  JoinTable,
  Relation,
  ManyToOne,
  ManyToMany,
} from "typeorm";
import { MovieBlob } from "./movie_blob.js";
import { Director } from "./director.js";
import { Actor } from "./actor.js";

@Entity()
export class Movie extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: "int" })
  release_year: number;

  @Column({ type: "float" })
  rating: number;

  @Column({ length: 300 })
  plot: string;

  @Column({ type: "int" })
  movie_length: number;

  @ManyToOne(() => Director, (Director) => Movie)
  director: Director;

  @ManyToMany(() => Actor, (Actor) => Movie)
  @JoinTable()
  actors: Actor[];

  @OneToOne(() => MovieBlob)
  blob: Relation<MovieBlob>;
}
