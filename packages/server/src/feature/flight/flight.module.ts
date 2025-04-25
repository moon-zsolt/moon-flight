import { Module } from "@nestjs/common";
import { FlightRepository } from "./flight.repository";

@Module({
  imports: [],
  exports: [FlightRepository],
  providers: [FlightRepository],
})
export class FlightModule {}
