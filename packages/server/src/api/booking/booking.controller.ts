import { Body, Controller, Get, Logger, Post } from "@nestjs/common";
import { BookingDto } from "./booking.dto";
import { CreateBookingDto } from "./create-booking.dto";
import { BookingService } from "src/feature/booking/booking.service";

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

  @Post("booking")
  async createBooking(@Body() body: CreateBookingDto): Promise<BookingDto> {
    this.logger.log(`Creating booking ${JSON.stringify(body)}`);

    const booking = await this.bookingService.create(body);

    return new BookingDto(booking);
  }
}
