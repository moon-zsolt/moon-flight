import { DataSource, Repository } from "typeorm";
import { Flight } from "./flight.entity";
import { Injectable } from "@nestjs/common";

@Injectable()
export class FlightRepository extends Repository<Flight> {
  constructor(dataSource: DataSource) {
    super(Flight, dataSource.createEntityManager());
  }
}
