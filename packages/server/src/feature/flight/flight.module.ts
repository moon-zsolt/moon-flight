import { Module } from "@nestjs/common";
import { FlightRepository } from "./flight.repository";
import { FlightService } from "./flight.service";

@Module({
  imports: [],
  exports: [FlightRepository, FlightService],
  providers: [FlightRepository, FlightService],
})
export class FlightModule {}
