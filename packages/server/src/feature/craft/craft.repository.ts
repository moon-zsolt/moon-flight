import { DataSource, Repository } from "typeorm";
import { Craft } from "./craft.entity";
import { Injectable } from "@nestjs/common";

@Injectable()
export class CraftRepository extends Repository<Craft> {
  constructor(dataSource: DataSource) {
    super(Craft, dataSource.createEntityManager());
  }
}
