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
    @Query("onlyBookable") onlyBookable: string,
  ) {
    const flights = await this.flightService.find(
      startId,
      destinationId,
      onlyBookable === "true" ? true : false,
    );

    return flights.map((flight) => new FlightDto(flight));
  }
}
