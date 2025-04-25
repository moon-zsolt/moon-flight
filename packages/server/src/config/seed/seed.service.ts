import {
  Injectable,
  Logger,
  OnApplicationBootstrap,
  OnApplicationShutdown,
} from "@nestjs/common";
import { BookingRepository } from "../../feature/booking/booking.repository";
import { FlightRepository } from "../../feature/flight/flight.repository";
import { LocationRepository } from "../../feature/location/location.repository";
import { CraftRepository } from "../../feature/craft/craft.repository";
import { Craft } from "../../feature/craft/craft.entity";
import { Location } from "../../feature/location/location.entity";
import { Flight } from "../../feature/flight/flight.entity";
import { Booking } from "../../feature/booking/booking.entity";

@Injectable()
export class SeedService
  implements OnApplicationBootstrap, OnApplicationShutdown
{
  private readonly logger = new Logger();

  constructor(
    private readonly bookingRepository: BookingRepository,
    private readonly flightRepository: FlightRepository,
    private readonly locationRepository: LocationRepository,
    private readonly craftRepository: CraftRepository,
  ) {}

  onApplicationBootstrap() {
    this.logger.log("LOADING DATA...");
    this.loadData().catch((e) => this.logger.error("FAILED TO LOAD DATA", e));
  }

  onApplicationShutdown() {
    this.logger.log("DELETING DATA...");
    this.deleteData().catch((e) =>
      this.logger.error("FAILED TO DELETE DATA", e),
    );
  }

  private async loadData() {
    const crafts: Partial<Craft>[] = [
      {
        name: "Airbus A320",
        capacity: 150,
      },
      {
        name: "Airbus A330neo",
        capacity: 257,
      },
      {
        name: "Starship",
        capacity: 100,
      },
    ];

    const createdCrafts = await this.craftRepository.save(crafts);

    const locations: Partial<Location>[] = [
      { name: "Budapest" },
      { name: "Berlin" },
      { name: "Boca Chica" },
      { name: "Moon" },
    ];

    const createdLocations = await this.locationRepository.save(locations);

    const flights: Partial<Flight>[] = [
      {
        craft: createdCrafts[0],
        start: createdLocations[0],
        destination: createdLocations[1],
        date: new Date(),
        flightTimeInMinutes: 60,
        distanceInKm: 686,
      },
      {
        craft: createdCrafts[1],
        start: createdLocations[1],
        destination: createdLocations[0],
        date: new Date(),
        flightTimeInMinutes: 60,
        distanceInKm: 686,
      },
      {
        craft: createdCrafts[2],
        start: createdLocations[2],
        destination: createdLocations[3],
        date: new Date(),
        flightTimeInMinutes: 4320,
        distanceInKm: 384400,
      },
      {
        craft: createdCrafts[2],
        start: createdLocations[3],
        destination: createdLocations[2],
        date: new Date(),
        flightTimeInMinutes: 4320,
        distanceInKm: 384400,
      },
    ];

    const createdFlights = await this.flightRepository.save(
      this.flightRepository.create(flights),
    );

    const bookings: Partial<Booking>[] = [
      {
        firstName: "Péter",
        lastName: "Polena",
        flight: createdFlights[0],
      },
      {
        firstName: "Zsolt",
        lastName: "Világos",
        flight: createdFlights[1],
      },
      {
        firstName: "Dániel",
        lastName: "Gergely",
        flight: createdFlights[2],
      },
    ];

    await this.bookingRepository.save(this.bookingRepository.create(bookings));
  }

  private async deleteData() {
    await this.bookingRepository.clear();
    await this.flightRepository.clear();
    await this.locationRepository.clear();
    await this.craftRepository.clear();
  }
}
