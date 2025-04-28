import { Injectable } from "@nestjs/common";
import { FlightRepository } from "./flight.repository";
import { Flight } from "./flight.entity";

@Injectable()
export class FlightService {
  constructor(private readonly flightRepository: FlightRepository) {}

  getAll(): Promise<Flight[]> {
    return this.flightRepository.find({
      relations: { start: true, destination: true, craft: true },
    });
  }
}
