import { Module } from "@nestjs/common";
import { LocationRepository } from "./location.repository";
import { LocationService } from "./location.service";

@Module({
  imports: [],
  exports: [LocationRepository, LocationService],
  providers: [LocationRepository, LocationService],
})
export class LocationModule {}
