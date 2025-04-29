import { Injectable } from "@nestjs/common";
import { CreateBookingDto } from "src/api/booking/create-booking.dto";
import { FlightRepository } from "../flight/flight.repository";
import { Booking } from "./booking.entity";
import { BookingRepository } from "./booking.repository";
import { FindBookingDto } from "src/api/booking/find-booking.dto";
import { UUID } from "crypto";
import { Flight } from "../flight/flight.entity";

@Injectable()
export class BookingService {
  constructor(
    private readonly bookingRepository: BookingRepository,
    private readonly flightRepository: FlightRepository,
  ) {}

  async findAll(): Promise<Booking[]> {
    const bookings = await this.bookingRepository.find({
      relations: {
        flight: true,
      },
    });
    return bookings;
  }

  async find(dto: FindBookingDto): Promise<Booking | null> {
    const booking = await this.bookingRepository.findOne({
      where: {
        code: dto.bookingCode,
        lastName: dto.lastName,
      },
      relations: {
        flight: { craft: true, start: true, destination: true },
      },
    });

    return booking;
  }

  async create(dto: CreateBookingDto): Promise<Booking> {
    const flight = await this.flightRepository.findOneByOrFail({
      id: dto.flightId,
    });

    const bookingToSave: Partial<Booking> = {
      firstName: dto.firstName,
      lastName: dto.lastName,
      flight,
    };

    const bookingSaved = await this.bookingRepository.save(
      this.bookingRepository.create(bookingToSave),
    );

    const booking = this.bookingRepository.findOneByOrFail({
      id: bookingSaved.id,
    });

    return booking;
  }

  async checkIn(id: UUID): Promise<Booking> {
    const booking = await this.bookingRepository.findOneOrFail({
      where: { id },
      relations: { flight: { start: true, destination: true, craft: true } },
    });

    if (booking.checkedIn === 1) {
      return booking;
    }

    booking.checkedIn = 1;
    booking.seat = await this.getSeat(booking.flight);

    await this.bookingRepository.save(booking);

    return await this.bookingRepository.findOneOrFail({
      where: { id },
      relations: { flight: { start: true, destination: true, craft: true } },
    });
  }

  private async getSeat(flight: Flight): Promise<number> {
    const capacity = flight.craft.capacity;

    const bookingCount = await this.bookingRepository.count({
      where: { flight: { id: flight.id }, checkedIn: 1 },
    });

    if (bookingCount === capacity) {
      throw new Error("Flight capacity reached.");
    }

    return bookingCount + 1;
  }
}
