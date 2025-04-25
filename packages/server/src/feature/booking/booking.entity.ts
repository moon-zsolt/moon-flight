import { randomUUID, UUID } from "crypto";
import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Flight } from "../flight/flight.entity";

@Entity()
export class Booking {
  @PrimaryGeneratedColumn("uuid")
  id: UUID;

  @Column({ nullable: false })
  code: string;

  @Column({ nullable: false })
  firstName: string;

  @Column({ nullable: false })
  lastName: string;

  @ManyToOne(() => Flight, { nullable: false })
  @JoinColumn()
  flight: Flight;

  @BeforeInsert()
  private generateFlightCode() {
    this.code = randomUUID().slice(0, 8).toUpperCase();
  }
}
