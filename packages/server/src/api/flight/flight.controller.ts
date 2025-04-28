import { Controller, Get } from "@nestjs/common";
import { FlightService } from "src/feature/flight/flight.service";
import { FlightDto } from "./flight.dto";

@Controller("/flight")
export class FlightController {
  constructor(private readonly flightService: FlightService) {}

  @Get()
  async getFlights() {
    const flights = await this.flightService.getAll();
    return flights.map((flight) => new FlightDto(flight));
  }
}
