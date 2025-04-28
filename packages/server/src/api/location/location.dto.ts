import { UUID } from "crypto";
import { Location } from "src/feature/location/location.entity";

export class LocationDto {
  constructor(location: Location) {
    this.id = location.id;
    this.name = location.name;
  }

  id: UUID;

  name: string;
}
