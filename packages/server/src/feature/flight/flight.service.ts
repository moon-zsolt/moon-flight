import { Injectable } from "@nestjs/common";
import { FlightRepository } from "./flight.repository";
import { Flight } from "./flight.entity";
import { UUID } from "crypto";
import { Equal, Not } from "typeorm";

@Injectable()
export class FlightService {
  constructor(private readonly flightRepository: FlightRepository) {}

  findBookable(
    startId: UUID | undefined,
    destinationId: UUID | undefined,
  ): Promise<Flight[]> {
    return this.flightRepository.find({
      where: {
        start: { id: startId },
        destination: { id: destinationId },
        emptySeats: Not(Equal(0)),
      },
      relations: { start: true, destination: true, craft: true },
    });
  }
}
