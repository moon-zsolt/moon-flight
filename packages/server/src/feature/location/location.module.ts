import { Module } from "@nestjs/common";
import { LocationRepository } from "./location.repository";

@Module({
  imports: [],
  exports: [LocationRepository],
  providers: [LocationRepository],
})
export class LocationModule {}
