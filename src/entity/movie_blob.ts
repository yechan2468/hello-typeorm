import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity()
export class MovieBlob extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  blob: string;
}
