import { Controller, Get, Query } from "@nestjs/common";
import { FlightService } from "src/feature/flight/flight.service";
import { FlightDto } from "./flight.dto";
import { UUID } from "crypto";

@Controller("/flight")
export class FlightController {
  constructor(private readonly flightService: FlightService) {}

  @Get()
  async getFlights(
    @Query("startId") startId: UUID,
    @Query("destinationId") destinationId: UUID,
  ) {
    const flights = await this.flightService.find(startId, destinationId);

    return flights.map((flight) => new FlightDto(flight));
  }
}
