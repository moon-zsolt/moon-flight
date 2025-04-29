import { Injectable } from "@nestjs/common";
import { CreateBookingDto } from "src/api/booking/create-booking.dto";
import { FlightRepository } from "../flight/flight.repository";
import { Booking } from "./booking.entity";
import { BookingRepository } from "./booking.repository";

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

  async create(dto: CreateBookingDto): Promise<Booking> {
    const flight = await this.flightRepository.findOneByOrFail({
      id: dto.flightId,
    });

    const bookingCode = this.generateBookingCode();

    const bookingToSave: Partial<Booking> = {
      code: bookingCode,
      firstName: dto.firstName,
      lastName: dto.lastName,
      flight,
    };

    const bookingSaved = await this.bookingRepository.save(bookingToSave);

    const booking = this.bookingRepository.findOneByOrFail({
      id: bookingSaved.id,
    });

    return booking;
  }

  private generateBookingCode(): string {
    // Generate 3 random uppercase letters
    const letters = Array.from({ length: 3 }, () =>
      String.fromCharCode(65 + Math.floor(Math.random() * 26)),
    ).join("");

    // Generate 3 random numbers
    const numbers = Math.floor(100 + Math.random() * 900).toString();

    return `${letters}${numbers}`;
  }
}
