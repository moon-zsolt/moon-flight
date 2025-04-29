import { Injectable } from "@nestjs/common";
import { FlightRepository } from "./flight.repository";
import { Flight } from "./flight.entity";
import { UUID } from "crypto";

@Injectable()
export class FlightService {
  constructor(private readonly flightRepository: FlightRepository) {}

  find(
    startId: UUID | undefined,
    destinationId: UUID | undefined,
  ): Promise<Flight[]> {
    return this.flightRepository.find({
      where: { start: { id: startId }, destination: { id: destinationId } },
      relations: { start: true, destination: true, craft: true },
    });
  }
}
