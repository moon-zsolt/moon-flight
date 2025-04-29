import { randomUUID, UUID } from "crypto";
import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Location } from "../location/location.entity";
import { Craft } from "../craft/craft.entity";

@Entity()
export class Flight {
  @PrimaryGeneratedColumn("uuid")
  id: UUID;

  @Column({ nullable: false })
  code: string;

  @ManyToOne(() => Craft, { nullable: false })
  @JoinColumn()
  craft: Craft;

  @ManyToOne(() => Location, { nullable: false })
  @JoinColumn()
  start: Location;

  @ManyToOne(() => Location, { nullable: false })
  @JoinColumn()
  destination: Location;

  @Column({ nullable: false })
  date: Date;

  @Column({ nullable: false })
  flightTimeInMinutes: number;

  @Column({ nullable: false })
  distanceInKm: number;

  @Column({ nullable: false })
  emptySeats: number;

  @BeforeInsert()
  private generateFlightCode() {
    this.code = "MF" + randomUUID().slice(0, 4).toUpperCase();
  }
}
