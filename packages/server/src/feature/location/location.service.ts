import { Injectable } from "@nestjs/common";
import { LocationRepository } from "./location.repository";
import { Location } from "./location.entity";

@Injectable()
export class LocationService {
  constructor(private readonly locationRepository: LocationRepository) {}

  getAll(): Promise<Location[]> {
    return this.locationRepository.find();
  }
}
