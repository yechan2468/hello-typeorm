import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity()
export class Member extends BaseEntity {
  @PrimaryGeneratedColumn()
  member_id: number;

  @Column()
  member_name: string;

  @Column()
  department: string;

  @Column()
  gisu: number;

  @Column({ length: 10 })
  student_id: string;

  @Column()
  phone_number: string;

  @Column()
  graduated: boolean;
}
