import { MoonFlightLogo } from "~/components/custom/moon-flight-logo/moon-flight-logo";

import { Clock, Code, Globe, MapPin, Plane, Ticket, User } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { Form } from "react-router";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import type { Booking } from "~/types/booking";
import type { FindBookingDto } from "~/types/find-booking";
import { Becker } from "~/components/custom/becker/becker";

type State =
  | {
      state: "initial";
    }
  | {
      state: "finding";
    }
  | {
      state: "found";
      booking: Booking;
    }
  | {
      state: "not-found";
    }
  | {
      state: "error";
    };

type UserBookingDetailsProps = {
  checkedInBooking: Booking | null;
};

export function UserBookingDetails({
  checkedInBooking,
}: UserBookingDetailsProps) {
  const [bookingCode, setBookingCode] = useState("");
  const [lastName, setLastName] = useState("");

  const [state, setState] = useState<State>({ state: "initial" });

  useEffect(() => {
    if (
      checkedInBooking &&
      state.state === "found" &&
      state.booking.id === checkedInBooking.id &&
      state.booking.checkedIn !== checkedInBooking.checkedIn
    ) {
      setState({ state: "found", booking: checkedInBooking });
    }
  }, [state, checkedInBooking]);

  const findBooking = () => {
    setState({ state: "finding" });

    const body: FindBookingDto = {
      bookingCode,
      lastName,
    };

    fetch("/booking/find", {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    })
      .then(async (response) => {
        if (response.ok) {
          const booking = (await response.json()) as Booking;

          setState({ state: "found", booking });
        } else if (response.status === 404) {
          setState({ state: "not-found" });
        } else {
          setState({ state: "error" });
        }
      })
      .catch(() => {
        setState({ state: "error" });
      });
  };

  return (
    <main className="flex items-center justify-center pt-4 lg:pt-16 pb-4">
      <div className="flex-1 flex flex-col items-center gap-4 lg:gap-16 min-h-0">
        <MoonFlightLogo />
        <div className="max-w-[600px] w-full space-y-6 px-4">
          <Becker />
          <nav className="rounded-3xl border border-gray-200 p-6 dark:border-gray-700 space-y-4">
            <h2 className="leading-6 text-2xl text-gray-700 dark:text-gray-200 font-bold">
              Find Your Booking!
            </h2>
            <p className="leading-6 text-gray-700 dark:text-gray-200">
              Set start or destination to search for flights!
            </p>

            <div>
              <Input
                placeholder="Booking Code"
                value={bookingCode}
                onChange={(e) => setBookingCode(e.target.value)}
              />
            </div>

            <div>
              <Input
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>

            <div>
              <Button
                disabled={
                  !bookingCode || !lastName || state.state === "finding"
                }
                onClick={findBooking}
              >
                Find Booking
              </Button>
            </div>

            <div>
              {state.state === "finding" && (
                <p className="text-gray-700 dark:text-gray-200">
                  Finding your booking...
                </p>
              )}
              {state.state === "not-found" && (
                <p className="text-red-500">Booking not found</p>
              )}
              {state.state === "error" && (
                <p className="text-red-500">An error occurred</p>
              )}
              {state.state === "found" && (
                <BookingDetails booking={state.booking} />
              )}
            </div>
          </nav>
        </div>
      </div>
    </main>
  );
}

type BookingDetailsProps = {
  booking: Booking;
};

function BookingDetails({ booking }: BookingDetailsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Booking Details</CardTitle>
        <CardDescription>Here's Your Booking</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <BookingDetail
            icon={<Ticket className="inline-block" />}
            title="Booking Code"
            data={booking.code}
          />
          <BookingDetail
            icon={<User className="inline-block" />}
            title="Passenger"
            data={`${booking.firstName} ${booking.lastName}`}
          />
          <BookingDetail
            icon={<MapPin className="inline-block" />}
            title="Start"
            data={booking.flight.start.name}
          />
          <BookingDetail
            icon={<MapPin className="inline-block" />}
            title="Destination"
            data={booking.flight.destination.name}
          />
          <BookingDetail
            icon={<Plane className="inline-block" />}
            title="Aircraft"
            data={`${booking.flight.craft.name} (${booking.flight.craft.capacity} seats)`}
          />
          <BookingDetail
            icon={<Code className="inline-block" />}
            title="Flight Code"
            data={booking.flight.code}
          />
          <BookingDetail
            icon={<Clock className="inline-block" />}
            title="Flight Time"
            data={`${booking.flight.flightTimeInMinutes} minutes`}
          />
          <BookingDetail
            icon={<Globe className="inline-block" />}
            title="Distance"
            data={`${booking.flight.distanceInKm} km`}
          />
        </div>
      </CardContent>
      <CardFooter>
        {booking.checkedIn && (
          <p className="text-green-500">
            You're checked in! Your seat number is {booking.seat}
          </p>
        )}
        {!booking.checkedIn && (
          <Form method="post">
            <input
              className="hidden"
              type="text"
              name="bookingId"
              value={booking.id}
              readOnly
            />
            <Button type="submit">Check In</Button>
          </Form>
        )}
      </CardFooter>
    </Card>
  );
}

type BookingDetailProps = {
  icon: ReactNode;
  title: string;
  data: string;
};

function BookingDetail({ icon, title, data }: BookingDetailProps) {
  return (
    <div>
      {icon} {title}: {data}
    </div>
  );
}
