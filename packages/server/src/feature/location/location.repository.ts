import { DataSource, Repository } from "typeorm";
import { Location } from "./location.entity";
import { Injectable } from "@nestjs/common";

@Injectable()
export class LocationRepository extends Repository<Location> {
  constructor(dataSource: DataSource) {
    super(Location, dataSource.createEntityManager());
  }
}
