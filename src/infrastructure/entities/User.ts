import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Publication } from "./Publication";
import { UserRoles } from "../../domain/UserRoles";

@Entity('users')
export class User{
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @Column({type: "varchar", length: 50})
  first_name!:string;

  @Column({type: "varchar", length: 50})
  second_name!:string;

  @Column({type: "varchar", length: 50})
  last_name!:string;

  @Column({type: "varchar", length: 50})
  second_last_name!:string;

  @Column({
    type: "enum",
    enum: UserRoles
  })
  rol!: UserRoles;
  
  @Column({type: "varchar", length: 254})
  email!:string;

  @Column({type: "varchar", length: 255})
  password!:string;

  @OneToMany(() => Publication, (publication) => publication.user)
  publications!: Publication[];

  @OneToMany(() => Publication, (publication) => publication.userReserve)
  reservedPublications!: Publication[];

  @CreateDateColumn({type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
  created_at!: Date;

  @UpdateDateColumn({type: "timestamp", default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP"})
  updated_at!: Date;

  @Column({type: "timestamp", nullable: true})
  deleted_at!: Date | null;
}