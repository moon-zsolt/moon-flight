import { UUID } from "crypto";
import { Flight } from "src/feature/flight/flight.entity";
import { CraftDto } from "../craft/craft.dto";
import { LocationDto } from "../location/location.dto";

export class FlightDto {
  constructor(flight: Flight) {
    this.id = flight.id;
    this.code = flight.code;
    this.craft = new CraftDto(flight.craft);
    this.start = new LocationDto(flight.start);
    this.destination = new LocationDto(flight.destination);
    this.date = new Date(flight.date);
    this.flightTimeInMinutes = flight.flightTimeInMinutes;
    this.distanceInKm = flight.distanceInKm;
    this.emptySeats = flight.emptySeats;
  }

  id: UUID;

  code: string;

  craft: CraftDto;

  start: LocationDto;

  destination: LocationDto;

  date: Date;

  flightTimeInMinutes: number;

  distanceInKm: number;

  emptySeats: number;
}
