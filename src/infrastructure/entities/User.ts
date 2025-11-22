import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User{
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({type: "varchar", length: 50})
  first_name!:string;

  @Column({type: "varchar", length: 50})
  second_name!:string;

  @Column({type: "varchar", length: 50})
  last_name!:string;

  @Column({type: "varchar", length: 50})
  second_last_name!:string;

  @Column({type: "varchar", length: 128})
  password!:string;

  @Column({type: "varchar"})
  created_at!:string;

  @Column({type: "varchar"})
  updated_at!:string;

  @Column({type: "varchar"})
  deleted_at!:string;
}