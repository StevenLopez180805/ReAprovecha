import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { PublicationStatus } from "../../domain/PublicationStatus";
import { User } from "./User";

@Entity('publications')
export class Publication {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @Column({ type: "varchar", length: 250 })
  titulo!: string;

  @Column({ type: "text" })
  descripcion!: string;

  @Column({ type: "int" })
  precio!: number;

  @Column({
    type: "enum",
    enum: PublicationStatus,
    default: PublicationStatus.DISPONIBLE
  })
  estado!: PublicationStatus;

  @Column({ type: "bigint" })
  user_id!: number;

  @ManyToOne(() => User, (user) => user.publications)
  @JoinColumn({ name: 'user_id' })
  user!: User;

  @Column({ type: "bigint", nullable: true })
  user_reserve_id!: number | null;

  @ManyToOne(() => User, (user) => user.reservedPublications, { nullable: true })
  @JoinColumn({ name: 'user_reserve_id' })
  userReserve!: User | null;

  @CreateDateColumn({ type: "timestamp" })
  created_at!: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updated_at!: Date;

  @Column({ type: "timestamp", nullable: true })
  deleted_at!: Date | null;
}
