import {
  Injectable,
  Logger,
  OnApplicationBootstrap,
  OnModuleDestroy,
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
export class SeedService implements OnApplicationBootstrap, OnModuleDestroy {
  private readonly logger = new Logger(SeedService.name);

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

  async onModuleDestroy() {
    this.logger.log("DELETING DATA...");
    try {
      await this.deleteData();
    } catch (e) {
      this.logger.error("FAILED TO DELETE DATA", e);
    }
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
        name: "ŰrIksz Csillaghajó",
        capacity: 100,
      },
    ];

    const createdCrafts = await this.craftRepository.save(crafts);

    const locations: Partial<Location>[] = [
      { name: "Budapest" },
      { name: "Berlin" },
      { name: "London" },
      { name: "Paris" },
      { name: "Madrid" },
      { name: "Rome" },
      { name: "Warsaw" },
      { name: "Prague" },
      { name: "Vienna" },
      { name: "Athens" },
      { name: "Moon" },
    ];

    const createdLocations = await this.locationRepository.save(locations);

    const now = new Date();

    const date1 = now;
    date1.setDate(now.getDate() + 1);
    date1.setHours(8, 15, 0, 0);

    const date2 = new Date(now);
    date2.setDate(now.getDate() + 2);
    date2.setHours(13, 35, 0, 0);

    const date3 = new Date(now);
    date3.setDate(now.getDate() + 3);
    date3.setHours(9, 25, 0, 0);

    const date4 = new Date(now);
    date4.setDate(now.getDate() + 4);
    date4.setHours(18, 0, 0, 0);

    const flights: Partial<Flight>[] = [
      //BUD > BER
      {
        craft: createdCrafts[0],
        start: createdLocations[0],
        destination: createdLocations[1],
        date: date1,
        flightTimeInMinutes: 60,
        distanceInKm: 686,
        emptySeats: createdCrafts[0].capacity,
      },
      //BER > BUD
      {
        craft: createdCrafts[0],
        start: createdLocations[1],
        destination: createdLocations[0],
        date: date2,
        flightTimeInMinutes: 60,
        distanceInKm: 686,
        emptySeats: createdCrafts[0].capacity,
      },
      ///////////
      //BUD > LON
      {
        craft: createdCrafts[1],
        start: createdLocations[0],
        destination: createdLocations[2],
        date: date1,
        flightTimeInMinutes: 160,
        distanceInKm: 1493,
        emptySeats: createdCrafts[1].capacity,
      },
      //LON > BUD
      {
        craft: createdCrafts[1],
        start: createdLocations[2],
        destination: createdLocations[0],
        date: date2,
        flightTimeInMinutes: 160,
        distanceInKm: 1493,
        emptySeats: createdCrafts[1].capacity,
      },
      ///////////
      //BUD > PAR
      {
        craft: createdCrafts[1],
        start: createdLocations[0],
        destination: createdLocations[3],
        date: date2,
        flightTimeInMinutes: 145,
        distanceInKm: 1244,
        emptySeats: createdCrafts[1].capacity,
      },
      //PAR > BUD
      {
        craft: createdCrafts[1],
        start: createdLocations[3],
        destination: createdLocations[0],
        date: date4,
        flightTimeInMinutes: 145,
        distanceInKm: 1244,
        emptySeats: createdCrafts[1].capacity,
      },
      ///////////
      //BUD > MAD
      {
        craft: createdCrafts[1],
        start: createdLocations[0],
        destination: createdLocations[4],
        date: date2,
        flightTimeInMinutes: 205,
        distanceInKm: 1978,
        emptySeats: createdCrafts[1].capacity,
      },
      //MAD > BUD
      {
        craft: createdCrafts[1],
        start: createdLocations[4],
        destination: createdLocations[0],
        date: date3,
        flightTimeInMinutes: 205,
        distanceInKm: 1978,
        emptySeats: createdCrafts[1].capacity,
      },
      ///////////
      //BUD > ROM
      {
        craft: createdCrafts[1],
        start: createdLocations[0],
        destination: createdLocations[5],
        date: date1,
        flightTimeInMinutes: 105,
        distanceInKm: 810,
        emptySeats: createdCrafts[1].capacity,
      },
      //ROM > BUD
      {
        craft: createdCrafts[1],
        start: createdLocations[5],
        destination: createdLocations[0],
        date: date4,
        flightTimeInMinutes: 105,
        distanceInKm: 810,
        emptySeats: createdCrafts[1].capacity,
      },
      ///////////
      //BUD > WAR
      {
        craft: createdCrafts[0],
        start: createdLocations[0],
        destination: createdLocations[6],
        date: date3,
        flightTimeInMinutes: 75,
        distanceInKm: 540,
        emptySeats: createdCrafts[0].capacity,
      },
      //WAR > BUD
      {
        craft: createdCrafts[0],
        start: createdLocations[6],
        destination: createdLocations[0],
        date: date4,
        flightTimeInMinutes: 75,
        distanceInKm: 540,
        emptySeats: createdCrafts[0].capacity,
      },
      ///////////
      //BUD > PRA
      {
        craft: createdCrafts[0],
        start: createdLocations[0],
        destination: createdLocations[7],
        date: date1,
        flightTimeInMinutes: 75,
        distanceInKm: 444,
        emptySeats: createdCrafts[0].capacity,
      },
      //PRA > BUD
      {
        craft: createdCrafts[0],
        start: createdLocations[7],
        destination: createdLocations[0],
        date: date2,
        flightTimeInMinutes: 75,
        distanceInKm: 444,
        emptySeats: createdCrafts[0].capacity,
      },
      ///////////
      //BUD > VIE
      {
        craft: createdCrafts[0],
        start: createdLocations[0],
        destination: createdLocations[8],
        date: date1,
        flightTimeInMinutes: 75,
        distanceInKm: 214,
        emptySeats: createdCrafts[0].capacity,
      },
      //VIE > BUD
      {
        craft: createdCrafts[0],
        start: createdLocations[8],
        destination: createdLocations[0],
        date: date2,
        flightTimeInMinutes: 75,
        distanceInKm: 214,
        emptySeats: createdCrafts[0].capacity,
      },
      ///////////
      //BUD > ATH
      {
        craft: createdCrafts[0],
        start: createdLocations[0],
        destination: createdLocations[9],
        date: date3,
        flightTimeInMinutes: 120,
        distanceInKm: 1122,
        emptySeats: createdCrafts[0].capacity,
      },
      //ATH > BUD
      {
        craft: createdCrafts[0],
        start: createdLocations[9],
        destination: createdLocations[0],
        date: date4,
        flightTimeInMinutes: 120,
        distanceInKm: 1122,
        emptySeats: createdCrafts[0].capacity,
      },
      ///////////
      //BUD > MOO
      {
        craft: createdCrafts[2],
        start: createdLocations[0],
        destination: createdLocations[10],
        date: date1,
        flightTimeInMinutes: 4320,
        distanceInKm: 384400,
        emptySeats: createdCrafts[2].capacity,
      },
      //MOO > BUD
      {
        craft: createdCrafts[2],
        start: createdLocations[10],
        destination: createdLocations[0],
        date: date4,
        flightTimeInMinutes: 4320,
        distanceInKm: 384400,
        emptySeats: createdCrafts[2].capacity,
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
        checkedIn: 0,
      },
      {
        firstName: "Zsolt",
        lastName: "Világos",
        flight: createdFlights[1],
        checkedIn: 0,
      },
      {
        firstName: "Klára",
        lastName: "Szabó-Biczók",
        flight: createdFlights[2],
        checkedIn: 0,
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
