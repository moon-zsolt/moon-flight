import { Module } from "@nestjs/common";
import { BookingRepository } from "./booking.repository";

@Module({
  imports: [],
  exports: [BookingRepository],
  providers: [BookingRepository],
})
export class BookingModule {}
