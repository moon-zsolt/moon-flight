import {
  Body,
  Controller,
  Get,
  Logger,
  NotFoundException,
  Param,
  Post,
} from "@nestjs/common";
import { BookingDto } from "./booking.dto";
import { CreateBookingDto } from "./create-booking.dto";
import { BookingService } from "src/feature/booking/booking.service";
import { FindBookingDto } from "./find-booking.dto";
import { UUID } from "crypto";

@Controller()
export class BookingController {
  private readonly logger = new Logger(BookingController.name);

  constructor(private readonly bookingService: BookingService) {}

  @Get("booking")
  async getBookings(): Promise<BookingDto[]> {
    this.logger.log("Getting all bookings");
    const bookings = await this.bookingService.findAll();

    return bookings.map((booking) => new BookingDto(booking));
  }

  @Post("booking/find")
  async findBooking(@Body() body: FindBookingDto): Promise<BookingDto> {
    this.logger.log(`Finding booking ${JSON.stringify(body)}`);

    const booking = await this.bookingService.find(body);

    if (!booking) {
      throw new NotFoundException(
        `No booking found for code ${body.bookingCode} and last name ${body.lastName}`,
      );
    }

    return new BookingDto(booking);
  }

  @Post("booking")
  async createBooking(@Body() body: CreateBookingDto): Promise<BookingDto> {
    this.logger.log(`Creating booking ${JSON.stringify(body)}`);

    const booking = await this.bookingService.create(body);

    return new BookingDto(booking);
  }

  @Post("booking/:id/check-in")
  async checkIn(@Param("id") id: string): Promise<BookingDto> {
    this.logger.log(`Checking-in booking ${JSON.stringify(id)}`);

    const checkedInBooking = await this.bookingService.checkIn(id as UUID);

    return new BookingDto(checkedInBooking);
  }
}
