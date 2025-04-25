import { DataSource, Repository } from "typeorm";
import { Booking } from "./booking.entity";
import { Injectable } from "@nestjs/common";

@Injectable()
export class BookingRepository extends Repository<Booking> {
  constructor(dataSource: DataSource) {
    super(Booking, dataSource.createEntityManager());
  }
}
