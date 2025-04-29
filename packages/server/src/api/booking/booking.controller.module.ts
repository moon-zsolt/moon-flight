import { Module } from "@nestjs/common";
import { BookingController } from "./booking.controller";
import { BookingModule } from "src/feature/booking/booking.module";

@Module({
  imports: [BookingModule],
  exports: [],
  providers: [],
  controllers: [BookingController],
})
export class BookingControllerModule {}
