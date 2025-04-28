import { Module } from "@nestjs/common";
import { BookingController } from "./booking.controller";

@Module({
  imports: [],
  exports: [],
  providers: [],
  controllers: [BookingController],
})
export class BookingControllerModule {}
