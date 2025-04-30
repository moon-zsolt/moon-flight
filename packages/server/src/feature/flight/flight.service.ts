import { Injectable } from "@nestjs/common";
import { FlightRepository } from "./flight.repository";
import { Flight } from "./flight.entity";
import { UUID } from "crypto";
import { MoreThanOrEqual } from "typeorm";

@Injectable()
export class FlightService {
  constructor(private readonly flightRepository: FlightRepository) {}

  find(
    startId: UUID | undefined,
    destinationId: UUID | undefined,
    onlyBookable: boolean | undefined,
  ): Promise<Flight[]> {
    return this.flightRepository.find({
      where: {
        start: { id: startId },
        destination: { id: destinationId },
        emptySeats: onlyBookable ? MoreThanOrEqual(1) : MoreThanOrEqual(0),
      },
      relations: { start: true, destination: true, craft: true },
    });
  }
}
