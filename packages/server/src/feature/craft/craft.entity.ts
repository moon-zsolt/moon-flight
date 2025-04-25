import { UUID } from "crypto";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Craft {
  @PrimaryGeneratedColumn("uuid")
  id: UUID;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  capacity: number;
}
