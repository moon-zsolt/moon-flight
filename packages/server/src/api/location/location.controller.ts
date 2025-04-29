import { Controller, Get } from "@nestjs/common";
import { LocationService } from "src/feature/location/location.service";
import { LocationDto } from "./location.dto";

@Controller("/location")
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Get()
  async getFlights() {
    const flights = await this.locationService.getAll();
    return flights.map((location) => new LocationDto(location));
  }
}
