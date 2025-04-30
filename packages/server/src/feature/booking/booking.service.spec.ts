import { Test } from "@nestjs/testing";
import { BookingService } from "./booking.service";
import { mock } from "../../../test/mock";
import { BookingRepository } from "./booking.repository";
import { FlightRepository } from "../flight/flight.repository";
import { CreateBookingDto } from "../../api/booking/create-booking.dto";
import { randomUUID } from "crypto";
import { EntityNotFoundError } from "typeorm";
import { Flight } from "../flight/flight.entity";
import { Craft } from "../craft/craft.entity";
import { Location } from "../location/location.entity";
import { Booking } from "./booking.entity";

describe("BookingService", () => {
  let bookingService: BookingService;
  let bookingRepository: BookingRepository;
  let flightRepository: FlightRepository;
  let craft: Craft;
  let start: Location;
  let destination: Location;
  let flight: Flight;
  let createBooking: CreateBookingDto;
  let booking: Booking;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [BookingService],
    })
      .useMocker((token) => {
        return mock(token);
      })
      .compile();

    bookingService = moduleRef.get<BookingService>(BookingService);
    bookingRepository = moduleRef.get<BookingRepository>(BookingRepository);
    flightRepository = moduleRef.get<FlightRepository>(FlightRepository);

    craft = new Craft();
    craft.id = randomUUID();
    craft.name = "Airbus A320";
    craft.capacity = 100;

    start = new Location();
    start.id = randomUUID();
    start.name = "Budapest";

    destination = new Location();
    destination.id = randomUUID();
    destination.name = "Berlin";

    flight = new Flight();
    flight.id = randomUUID();
    flight.code = "MF1";
    flight.craft = craft;
    flight.start = start;
    flight.destination = destination;
    flight.emptySeats = craft.capacity;
    flight.date = new Date();
    flight.distanceInKm = 686;
    flight.flightTimeInMinutes = 60;

    createBooking = new CreateBookingDto();
    createBooking.firstName = "John";
    createBooking.lastName = "Doe";
    createBooking.flightId = flight.id;

    booking = new Booking();
    booking.id = randomUUID();
    booking.code = "MF1B1";
    booking.firstName = createBooking.firstName;
    booking.lastName = createBooking.lastName;
    booking.flight = flight;
    booking.checkedIn = 0;
  });

  describe("create", () => {
    it("invalid id throws error", async () => {
      // GIVEN
      const error = new EntityNotFoundError(Flight, {
        where: { id: createBooking.flightId },
      });

      jest.spyOn(flightRepository, "findOneByOrFail").mockRejectedValue(error);

      const save = jest.spyOn(bookingRepository, "save");

      // WHEN
      const result = bookingService.create(createBooking);

      // THEN
      await expect(result).rejects.toThrow(error);
      expect(save).not.toHaveBeenCalled();
    });

    it("success creates booking", async () => {
      // GIVEN
      jest.spyOn(flightRepository, "findOneByOrFail").mockResolvedValue(flight);
      jest.spyOn(bookingRepository, "save").mockResolvedValue(booking);
      jest
        .spyOn(bookingRepository, "findOneByOrFail")
        .mockResolvedValue(booking);

      // WHEN

      const result = await bookingService.create(createBooking);

      // THEN
      expect(result).toStrictEqual(booking);
    });
  });

  describe("checkIn", () => {
    it("invalid id throws error", async () => {
      // GIVEN
      const error = new EntityNotFoundError(Flight, {
        where: { id: booking.id },
      });

      jest.spyOn(bookingRepository, "findOneOrFail").mockRejectedValue(error);

      // WHEN

      const result = bookingService.checkIn(randomUUID());
      const save = jest.spyOn(bookingRepository, "save");

      // THEN

      await expect(result).rejects.toThrow(error);
      expect(save).not.toHaveBeenCalled();
    });

    it("already checked in returns early", async () => {
      // GIVEN
      booking.checkedIn = 1;
      booking.seat = 1;

      jest.spyOn(bookingRepository, "findOneOrFail").mockResolvedValue(booking);

      const saveFlight = jest.spyOn(flightRepository, "save");

      const saveBooking = jest.spyOn(bookingRepository, "save");

      // WHEN
      const result = await bookingService.checkIn(booking.id);

      // THEN
      expect(result).toStrictEqual(booking);
      expect(saveFlight).not.toHaveBeenCalled();
      expect(saveBooking).not.toHaveBeenCalled();
    });

    it("success checks in booking", async () => {
      // GIVEN
      const checkedInBooking = new Booking();
      checkedInBooking.id = booking.id;
      checkedInBooking.code = booking.code;
      checkedInBooking.firstName = booking.firstName;
      checkedInBooking.lastName = booking.lastName;

      const updatedFlight = booking.flight;
      updatedFlight.emptySeats -= 1;

      checkedInBooking.flight = updatedFlight;
      checkedInBooking.checkedIn = 1;
      checkedInBooking.seat = 1;

      jest
        .spyOn(bookingRepository, "findOneOrFail")
        .mockResolvedValueOnce(booking);

      jest
        .spyOn(bookingRepository, "findOneOrFail")
        .mockResolvedValueOnce(checkedInBooking);

      // WHEN

      const result = await bookingService.checkIn(booking.id);

      // THEN
      expect(result).toStrictEqual(checkedInBooking);
    });
  });
});
